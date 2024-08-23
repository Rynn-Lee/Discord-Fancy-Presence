import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export default function ImagesForm() {
  const { register } = useFormContext();
  return (
    <div>
      <Label>Large Image</Label>
      <Input
        className="mt-2"
        placeholder="Large Image URL"
        {...register("largeImageUrl")}
      />
      <Input
        className="mb-3 mt-2"
        placeholder="Large Image Text"
        {...register("largeImageText")}
      />
      <Label>Small Image</Label>
      <Input
        className="mt-2"
        placeholder="Small Image URL"
        {...register("smallImageUrl")}
      />
      <Input
        className="mt-2"
        placeholder="Small Image Text"
        {...register("smallImageText")}
      />
    </div>
  );
}
