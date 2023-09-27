"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next-intl/client";
import { ChangeEvent, useTransition } from "react";

export default function LocaleSwitcher() {
  const t = useTranslations("localeSwitcher");
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    startTransition(() => {
      router.replace(`/${event.target.value}${pathname}`);
    });
  }

  return (
    <label
      className={clsx(
        "relative text-gray-400",
        isPending && "transition-opacity [&:disabled]:opacity-30"
      )}
    >
      <p className="sr-only">{t("label")}</p>
      <select
        className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
        defaultValue={locale}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {["en", "cn"].map((cur) => (
          <option key={cur} value={cur}>
            {t("locale", { locale: cur })}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute top-[8px] right-2">⌄</span>
    </label>
  );
}
