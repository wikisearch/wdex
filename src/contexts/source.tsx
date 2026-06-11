"use client";

import {
  useMemo,
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
} from "react";
import {
  SOURCES,
  SOURCE_COOKIE_KEY,
  INSTALLED_SOURCES_COOKIE_KEY,
} from "@/constants/sources";
import type { Source } from "@/constants/sources";
import { getCookie, setCookie } from "@/utils/cookie";

export type SourceState = {
  selectedSource: Source;
  hasSeenWelcome: boolean;
  installedSourceIds: string[];
};

type SourceContextValue = SourceState & {
  selectSource: (sourceId: string) => void;
  dismissWelcome: () => void;
  installSource: (sourceId: string) => void;
  uninstallSource: (sourceId: string) => void;
  isInstalled: (sourceId: string) => boolean;
  sources: Source[];
  installedSources: Source[];
};

const DEFAULT_SOURCE = SOURCES[0];

function parseInstalledSources(value: string | null): string[] {
  if (!value) return ["mangadex"];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed;
    return ["mangadex"];
  } catch {
    return ["mangadex"];
  }
}

const SourceContext = createContext<SourceContextValue | undefined>(undefined);

export function SourceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<SourceState>(() => {
    return {
      selectedSource: DEFAULT_SOURCE,
      hasSeenWelcome: false,
      installedSourceIds: ["mangadex"],
    };
  });

  useEffect(() => {
    const saved = getCookie(SOURCE_COOKIE_KEY);
    const installedRaw = getCookie(INSTALLED_SOURCES_COOKIE_KEY);
    const installedSourceIds = parseInstalledSources(installedRaw);

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const source =
          SOURCES.find((s) => s.id === parsed.selectedSourceId) ||
          DEFAULT_SOURCE;
        setState({
          selectedSource: source,
          hasSeenWelcome: parsed.hasSeenWelcome || false,
          installedSourceIds,
        });
      } catch {
        setState({
          selectedSource: DEFAULT_SOURCE,
          hasSeenWelcome: false,
          installedSourceIds,
        });
      }
    } else {
      setState((prev) => ({ ...prev, installedSourceIds }));
    }
  }, []);

  const selectSource = useCallback((sourceId: string) => {
    const source = SOURCES.find((s) => s.id === sourceId) || DEFAULT_SOURCE;
    setState((prev) => {
      const next = { ...prev, selectedSource: source, hasSeenWelcome: true };
      setCookie(
        SOURCE_COOKIE_KEY,
        JSON.stringify({
          selectedSourceId: source.id,
          hasSeenWelcome: next.hasSeenWelcome,
        }),
        365,
      );
      return next;
    });
  }, []);

  const dismissWelcome = useCallback(() => {
    setState((prev) => {
      const next = { ...prev, hasSeenWelcome: true };
      setCookie(
        SOURCE_COOKIE_KEY,
        JSON.stringify({
          selectedSourceId: next.selectedSource.id,
          hasSeenWelcome: true,
        }),
        365,
      );
      return next;
    });
  }, []);

  const saveInstalledSources = useCallback((ids: string[]) => {
    setCookie(INSTALLED_SOURCES_COOKIE_KEY, JSON.stringify(ids), 365);
  }, []);

  const installSource = useCallback(
    (sourceId: string) => {
      setState((prev) => {
        if (prev.installedSourceIds.includes(sourceId)) return prev;
        const next = {
          ...prev,
          installedSourceIds: [...prev.installedSourceIds, sourceId],
          hasSeenWelcome: true,
        };
        saveInstalledSources(next.installedSourceIds);
        return next;
      });
    },
    [saveInstalledSources],
  );

  const uninstallSource = useCallback(
    (sourceId: string) => {
      if (sourceId === "mangadex") return;
      setState((prev) => {
        const next = {
          ...prev,
          installedSourceIds: prev.installedSourceIds.filter(
            (id) => id !== sourceId,
          ),
        };
        saveInstalledSources(next.installedSourceIds);
        return next;
      });
    },
    [saveInstalledSources],
  );

  const isInstalled = useCallback(
    (sourceId: string) => state.installedSourceIds.includes(sourceId),
    [state.installedSourceIds],
  );

  const installedSources = useMemo(
    () => SOURCES.filter((s) => state.installedSourceIds.includes(s.id)),
    [state.installedSourceIds],
  );

  const value = useMemo(
    () => ({
      ...state,
      selectSource,
      dismissWelcome,
      installSource,
      uninstallSource,
      isInstalled,
      sources: SOURCES,
      installedSources,
    }),
    [
      state,
      selectSource,
      dismissWelcome,
      installSource,
      uninstallSource,
      isInstalled,
      installedSources,
    ],
  );

  return (
    <SourceContext.Provider value={value}>{children}</SourceContext.Provider>
  );
}

export function useSourceContext() {
  const context = useContext(SourceContext);
  if (!context)
    throw new Error("useSourceContext must be used within SourceProvider");
  return context;
}
