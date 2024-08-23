import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormProvider, useForm } from "react-hook-form";
import TextForm from "./text-form";
import ImagesForm from "./images-form";
import ButtonsForm from "./buttons-form";
import ExtraForm from "./extra-form";

interface ActivityInfoFormProps {
  onChange: (activityInfo: any) => void;
}

export default function ActivityInfoForm({ onChange }: ActivityInfoFormProps) {
  const form = useForm();

  const values = form.watch();

  console.log(values);

  return (
    <FormProvider {...form}>
      <Tabs defaultValue="text" className="">
        <TabsList>
          <TabsTrigger value="text">Text</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="extra">Extra</TabsTrigger>
        </TabsList>
        <TabsContent value="text">
          <TextForm />
        </TabsContent>
        <TabsContent value="images">
          <ImagesForm />
        </TabsContent>
        <TabsContent value="buttons">
          <ButtonsForm />
        </TabsContent>
        <TabsContent value="extra">
          <ExtraForm />
        </TabsContent>
      </Tabs>
    </FormProvider>
  );
}
