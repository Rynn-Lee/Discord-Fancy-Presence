import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";

export default function TextForm() {
  const { register } = useFormContext();
  return (
    <div>
      <Label>Details</Label>
      <Input
        className="mb-3 mt-2"
        placeholder="Details"
        {...register("details")}
      />
      <Label>State</Label>
      <Input className="mt-2" placeholder="State" {...register("state")} />
    </div>
  );
}
