import { SettingsFormData, settingsSchema } from "@/lib/schemas";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "./ui/form";
import { CustomFormField } from "./FormField";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const SettingsForm = ({
  initialData,
  onSubmit,
  userType,
}: SettingsFormProps) => {
  const [editMode, setEditMode] = useState(false);
  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialData,
  });

  const toggleEditMode = () => {
    setEditMode(!editMode);
    if (editMode) {
      form.reset(initialData);
    }
  };

  const handleSubmit = async (data: SettingsFormData) => {
    await onSubmit(data);
    setEditMode(false);
  };
  return (
    <div className="pt-8 pb-5 px-8 text-black">
      <div className="mb-5">
        <h1 className="text-xl font-semibold">
          {userType.charAt(0).toUpperCase() + userType.slice(1)} Settings
        </h1>
        <p>Manage your account preferences and personal information</p>
      </div>

      <div className="bg-white rounded-2xl p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <CustomFormField name="name" label="Name" disabled={!editMode} />
            <CustomFormField
              name="email"
              label="Email"
              type="email"
              disabled={!editMode}
            />
            <CustomFormField
              name="phoneNumber"
              label="Phone Number"
              disabled={!editMode}
            />

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                onClick={toggleEditMode}
                className={cn(
                  "text-black",
                  editMode
                    ? "bg-red-500 hover:bg-red-300 text-white"
                    : "bg-[#0ADCFF]/90 hover:bg-[#0ACDFF]/60"
                )}
              >
                {editMode ? "Cancel" : "Edit"}
              </Button>

              {editMode && (
                <Button
                  type="submit"
                  className={cn("text-white bg-black hover:bg-black/70")}
                >
                  Save Changes
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SettingsForm;
