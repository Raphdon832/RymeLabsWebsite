"use client";

import { useCallback, useEffect, useState } from "react";
import { ProjectIntake } from "@/types/projects";

export function useProjectIntakes() {
  const [intakes, setIntakes] = useState<ProjectIntake[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/projects", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to load intake projects");
      }
      const data = await response.json();
      setIntakes(Array.isArray(data.projects) ? data.projects : []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProject = useCallback(
    async (
      id: string,
      updates: Partial<Pick<ProjectIntake, "status" | "stage" | "details">>
    ) => {
      setUpdatingId(id);
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData?.error || "Unable to update project");
        }

        const data = await response.json();
        if (data?.project) {
          setIntakes((prev) =>
            prev.map((project) => (project.id === id ? data.project : project))
          );
        }

        return data.project as ProjectIntake;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unable to update project";
        setError(message);
        throw err;
      } finally {
        setUpdatingId(null);
      }
    },
    []
  );

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const deleteProject = useCallback(async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error || "Unable to delete project");
      }

      setIntakes((prev) => prev.filter((project) => project.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to delete project";
      setError(message);
      throw err;
    } finally {
      setDeletingId(null);
    }
  }, []);

  return {
    intakes,
    loading,
    error,
    refresh: fetchProjects,
    updateProject,
    updatingId,
    deleteProject,
    deletingId,
  };
}
