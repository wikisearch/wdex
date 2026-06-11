import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

import Iconify from "@/components/iconify";
import useHostname from "@/hooks/useHostname";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Constants } from "@/constants";

import OpenDevToolsImage from "@/assets/sync-guide/open-dev-tools.jpg";
import OpenConsoleImage from "@/assets/sync-guide/open-console.jpg";
import CMangaSyncImage from "@/assets/sync-guide/cmanga-sync.png";

import { Button } from "../Button";
import { Copy } from "lucide-react";

const headingClassName = "mt-6 text-base font-bold text-accent";

export default function FollowingSync() {
  const [source, setSource] = useState<string>("");
  return (
    <div className="flex flex-col gap-2 text-sm text-foreground/80">
      <p>
        Hướng dẫn đồng danh sách theo dõi truyện từ CManga, MangaDex, CuuTruyen
        sang wdex
      </p>
      <div className="rounded-lg border border-accent/10 bg-accent/5 p-3 text-xs text-muted-foreground">
        <b>Lưu ý:</b> Các thao tác phía dưới chỉ thực hiện được trên thiết bị
        máy tính/laptop.
      </div>

      <div className={headingClassName}>Bước 1: Chọn nguồn</div>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Chọn nguồn muốn đồng bộ:</span>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="block rounded-lg border border-border/30 bg-background p-2 text-sm text-foreground shadow-soft transition-all focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
        >
          <option value="">Chọn nguồn</option>
          <option value="cmanga">CManga</option>
          <option value="mangadex">MangaDex</option>
          <option value="cuutruyen">CuuTruyen</option>
        </select>
      </div>
      <div className="rounded-lg border border-accent/10 bg-accent/5 p-3 text-xs text-muted-foreground">
        <b>Lưu ý:</b> Bạn có thể đồng bộ NetTruyen, TruyenQQ sang CManga, rồi
        đồng bộ CManga sang wdex.
      </div>

      <div className={headingClassName}>Bước 2: Đăng nhập</div>
      {source ? (
        <Step2 source={source} />
      ) : (
        <div className="text-muted-foreground/60">
          Vui lòng chọn nguồn đồng bộ
        </div>
      )}

      <div className={headingClassName}>Bước 3: Mở Console</div>
      {source ? (
        <Step3 source={source} />
      ) : (
        <div className="text-muted-foreground/60">
          Vui lòng chọn nguồn đồng bộ
        </div>
      )}

      <div className={headingClassName}>Bước 4: Sao chép script</div>
      {source ? (
        <Step4 source={source} />
      ) : (
        <div className="text-muted-foreground/60">
          Vui lòng chọn nguồn đồng bộ
        </div>
      )}

      <div className={headingClassName}>Bước 5: Hoàn tất</div>
      {source ? (
        <Step5 source={source} />
      ) : (
        <div className="text-muted-foreground/60">
          Vui lòng chọn nguồn đồng bộ
        </div>
      )}
    </div>
  );
}

function Step2({ source }: { source: string }) {
  return (
    <div>
      Truy cập {source} và <b>đăng nhập</b>.
      {source === "cmanga" && (
        <>
          <div className="mt-1 text-muted-foreground">
            Sau khi đăng nhập vào CManga, bạn có thể đồng bộ truyện từ NetTruyen
            và TruyenQQ sang CManga trước.
          </div>
          <Image
            className="mt-2 rounded-lg border border-border/10"
            src={CMangaSyncImage}
            alt="CManga"
          />
        </>
      )}
    </div>
  );
}

function Step3({ source }: { source: string }) {
  return (
    <div>
      <div>Tại website của {source}, mở tab Console của Developer Tools:</div>
      <ul className="mt-1 list-inside list-disc text-muted-foreground">
        <li>Windows: Ctrl + Shift + J</li>
        <li>Mac: Command (⌘) + Option (⌥) + J</li>
        <li>Hoặc làm thủ công theo bước dưới để mở Developer Tools:</li>
      </ul>
      <Image
        className="mt-2 rounded-lg border border-border/10"
        src={OpenDevToolsImage}
        alt="Mở Developer Tools"
      />
    </div>
  );
}

function Step4({ source: _source }: { source: string }) {
  const hostname = useHostname();
  const script = `fetch("https://${hostname}/api/sync-script").then((r)=>r.text()).then((c)=>{eval(c)})`;
  const [_, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        toast.success("Đã sao chép script!");
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  return (
    <div>
      <div>
        Mở tab Console, sao chép script phía dưới, dán vào Console và bấm Enter.
      </div>
      <pre className="mt-2 whitespace-pre-wrap break-words rounded-lg border border-border/10 bg-muted p-4 text-sm text-foreground shadow-soft">
        <code className="whitespace-pre-wrap break-words">{script}</code>
      </pre>
      <Button
        className="mt-2"
        icon={<Copy size={14} />}
        onClick={handleCopy(script)}
      >
        Sao chép
      </Button>
      <Image
        className="mt-2 rounded-lg border border-border/10"
        src={OpenConsoleImage}
        alt="Mở Console"
      />
    </div>
  );
}

function Step5({ source: _source }: { source: string }) {
  return (
    <div>
      <div>
        Làm theo các hướng dẫn còn lại. Nếu gặp bất cứ vấn đề nào, hãy nhắn tin
        để mình có thể hỗ trợ.
      </div>
      <Link href={Constants.Routes.report} target="_blank">
        <Button className="mt-2" icon={<Iconify icon="fa:comment" />}>
          Hỗ trợ
        </Button>
      </Link>
    </div>
  );
}
