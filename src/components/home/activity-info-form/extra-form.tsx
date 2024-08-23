import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function ExtraForm() {
  // const { register } = useFormContext();
  return (
    <div>
      <div className="my-5 flex justify-between">
        <Label>Timer</Label>
        <Switch />
      </div>
      <Label>Custome label for the selected app</Label>
      <Input className="mb-3 mt-2" placeholder="Application ID" />
      {/* TODO: replace with priority selector */}
      <Label>Priority level</Label>
      <Input
        className="mt-2"
        placeholder="Priority over other apps"
        type="number"
      />
    </div>
  );
}
