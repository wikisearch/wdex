import { FC } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

export const Alert: FC<{
  title: string;
  description?: string;
  action?: React.ReactNode;
  classNames?: {
    alert?: string;
    title?: string;
    description?: string;
  };
  icon?: React.ReactNode;
}> = (props) => {
  return (
    <div
      className={twMerge(
        "flex flex-col gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 sm:flex-row",
        props.classNames?.alert,
      )}
    >
      <div className="flex grow gap-2 sm:items-center">
        <span className="shrink-0 text-yellow-600">
          {props.icon || <FaExclamationCircle className="inline text-[20px]" />}
        </span>
        <div className="flex h-full grow flex-col justify-center">
          <h4
            className={twMerge(
              "text-sm font-semibold text-foreground",
              props.classNames?.title,
            )}
          >
            {props.title}
          </h4>
          {props.description && (
            <p
              className={twMerge(
                "mt-1 text-xs text-muted-foreground",
                props.classNames?.description,
              )}
            >
              {props.description}
            </p>
          )}
        </div>
      </div>
      <div className="shrink-0 pl-6 sm:pl-3">{props.action}</div>
    </div>
  );
};
