import { ComponentProps } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ApplicationSelectProps extends ComponentProps<typeof Select> {
  className?: string;
}

export default function ApplicationSelect({
  className,
  ...props
}: ApplicationSelectProps) {
  return (
    <Select defaultValue="idle" {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Select an application" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Application</SelectLabel>
          <SelectItem value="idle">Idle</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
