import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

export function BottomMenu() {
  return (
      <section
          className={cn(`bg-black w-full h-16 fixed bottom-0 p-1 flex justify-center items-center gap-2.5`)}
      >
        <Button className="button">
          Button
        </Button>

        <Button className="button">
          Button
        </Button>

      </section>
  );
}