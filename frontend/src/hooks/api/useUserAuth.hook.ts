import UserAuth from "@/lib/services/userAuth.service";
import { Manager, Tenant } from "@/types/dbTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthUser, fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { use, useEffect, useState } from "react";

/**
 * Get the user's session and user data from Amplify, we will need the idToken to check their role and the user data for the cognito id
 * We use a useEffect and useState to fetch the data and set the state variables
 * We build a custom endpoint depending on the user's role
 * We then use the useQuery hook to fetch the user's data from the endpoint
 * If the user is a manager, we use the manager endpoint, if the user is a tenant, we use the tenant endpoint
 * If we get a 404 error, we create a new user in the database using the useMutation hook
 */
const useUserAuth = () => {
  const queryClient = useQueryClient();
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>("");

  // Fetch session and user data
  useEffect(() => {
    const fetchUser = async () => {
      const sessionData = await fetchAuthSession();
      const { idToken } = sessionData.tokens ?? {};

      const userData = await getCurrentUser();
      const role = idToken?.payload["custom:role"] as string;

      const userInfo = {
        ...userData,
        email: idToken?.payload["email"],
      };
      setSession(sessionData);
      setUser(userInfo);
      setUserRole(role);
    };

    fetchUser();
  }, []);

  const endpoint = userRole === "manager" ? `/managers` : `/tenants`;

  return useQuery({
    queryKey: ["userAuth", user?.userId],
    queryFn: async () => {
      try {
        const response = await UserAuth.getAuthUser(
          `${endpoint}/${user.userId}`
        );

        return {
          data: {
            cognitoInfo: { ...user },
            userInfo: response as Tenant | Manager,
            userRole,
          },
        };
      } catch (error: any) {
        if (error.response?.status === 404) {
          //create new user
          const userData = {
            cognitoId: user.userId,
            name: user.username,
            email: user.email,
            phoneNumber: "",
          };

          const response = await UserAuth.createAuthUser(endpoint, userData);

          const newUser = {
            data: {
              cognitoInfo: { ...user },
              userInfo: response as Tenant | Manager,
              userRole,
            },
          };

          // Update cache with newly created user
          await queryClient.setQueryData(["userAuth", user.userId], newUser);

          return newUser;
        } else {
          throw error;
        }
      }
    },
  });
};

const useUserAuthMutation = () => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<any>(null);

  //Fetch user data
  useEffect(() => {
    const fetchAuth = async () => {
      const session = await fetchAuthSession();
      const { idToken } = session.tokens ?? {};

      const userData = await getCurrentUser();
      const role = idToken?.payload["custom:role"] as string;

      const userInfo = {
        ...userData,
        role,
        email: idToken?.payload["email"],
      };
      setUser(userInfo);
    };

    fetchAuth();
  }, []);

  console.log("User :", user);
  const endpoint = user?.role === "manager" ? `/managers` : `/tenants`;

  return useMutation({
    mutationFn: (data: Partial<Tenant | Manager>) => {
      const url = `${endpoint}/${user.userId}`;
      return UserAuth.updateAuthUser(url, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userAuth", user.userId] });
    },
  });
};

export { useUserAuth, useUserAuthMutation };
