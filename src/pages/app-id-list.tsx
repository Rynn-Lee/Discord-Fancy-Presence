import styles from "@styles/pages/app-id-list.module.sass";
import appListJson from "../../app-id-list.json";
// import Input from "@/components/ui/input-old";
import { useState } from "react";
import Icons from "@/components/icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AppIdList() {
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState("");

  return (
    <div className="flex h-screen w-full flex-col px-2.5 pt-2.5">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for an app..."
      />
      <hr className="my-3 w-full border-fp-accent" />
      <span className="my-1 ml-2">
        Don't see the game you want?{" "}
        <a
          className="text-fp-accent hover:underline"
          href="https://discord.com/developers/applications"
          target="_blank"
        >
          Register your own title
        </a>
      </span>
      <div className="h-full overflow-auto">
        {appListJson.map(
          (item: any) =>
            item.name.toLowerCase().indexOf(query.toLowerCase()) > -1 && ( //If satisfies search query
              <div
                key={`${item.id}`}
                className="flex items-center justify-between odd:bg-fp-primary-darker even:bg-fp-primary"
              >
                <span>{item.name}</span>
                <div className="flex items-center justify-between gap-2 pr-4">
                  <span>{item.id}</span>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(item.id),
                        setCopiedId(item.id);
                    }}
                  >
                    <Icons.clipboard />
                  </Button>
                </div>
              </div>
            ),
        )}
      </div>
    </div>
  );
}
