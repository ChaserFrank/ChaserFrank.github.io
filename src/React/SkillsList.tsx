
import { useState } from "react";

const skills = {
  "Backend Development": [
    "Server-side application development",
    "REST API design and implementation",
    "Maintainable architecture and business logic",
  ],
  "Data & Systems Integration": [
    "Relational database design and data integrity",
    "API integration and service communication",
    "AI tool orchestration and structured workflows",
  ],
  "Testing & Infrastructure": [
    "Automated testing and systematic debugging",
    "Linux environments, containers, and deployment",
    "Version control and background processing",
  ],
} as const;

const icons = {
  "Backend Development": "</>",
  "Data & Systems Integration": "{}",
  "Testing & Infrastructure": "[]",
} as const;

type SkillCategory = keyof typeof skills;

export default function SkillsList() {
  const [openItem, setOpenItem] =
    useState<SkillCategory | null>("Backend Development");

  return (
    <div className="text-left pt-3 md:pt-9">
      <h3 className="text-[var(--white)] text-3xl md:text-4xl font-semibold md:mb-6">
        What I do
      </h3>

      <ul className="space-y-4 mt-4 text-lg">
        {(Object.keys(skills) as SkillCategory[]).map((category) => {
          const isOpen = openItem === category;

          return (
            <li key={category} className="w-full md:w-[400px]">
              <button
                type="button"
                onClick={() =>
                  setOpenItem(isOpen ? null : category)
                }
                aria-expanded={isOpen}
                className="w-full bg-[#1414149c] rounded-2xl text-left hover:bg-opacity-80 transition-all border border-[var(--white-icon-tr)] overflow-hidden"
              >
                <span className="flex items-center gap-3 p-4">
                  <span
                    className="text-[var(--sec)] font-mono text-xl"
                    aria-hidden="true"
                  >
                    {icons[category]}
                  </span>

                  <span className="flex items-center flex-grow justify-between gap-2">
                    <span className="text-[var(--white)] text-base md:text-lg">
                      {category}
                    </span>

                    <span
                      className={`text-[var(--white)] transform transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      ⌄
                    </span>
                  </span>
                </span>

                <span
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <span className="overflow-hidden">
                    <span className="block px-4 pb-4 space-y-2 text-[var(--white-icon)] text-sm">
                      {skills[category].map((item) => (
                        <span
                          key={item}
                          className="flex items-start"
                        >
                          <span className="pl-1" aria-hidden="true">
                            •
                          </span>
                          <span className="pl-3">{item}</span>
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
