import "./Staff.css";
import { useT } from "../i18n/LanguageContext.jsx";

const staffMembers = [
  { name: "Kovacs Bela", roleKey: "staffRoleHeadCoach" },
  { name: "Toth Mark", roleKey: "staffRoleAssistantCoach" },
  { name: "Nagy Zoltan", roleKey: "staffRoleGoalkeeperCoach" },
  { name: "Fekete Aron", roleKey: "staffRoleFitnessCoach" },
  { name: "Szabo Emma", roleKey: "staffRoleDoctor" },
  { name: "Kiss Nora", roleKey: "staffRolePhysio" },
  { name: "Varga Levente", roleKey: "staffRoleAnalyst" },
  { name: "Horvath Peter", roleKey: "staffRoleKitManager" },
];

const initialsFromName = (name) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);

const Staff = () => {
  const t = useT();
  return (
    <div className="staff-page">
      <h1>{t("staffTitle")}</h1>

      <div className="staff-grid">
        {staffMembers.map((member) => (
          <article className="staff-card" key={member.name}>
            <div className="staff-avatar">{initialsFromName(member.name)}</div>
            <div className="staff-info">
              <h2>{member.name}</h2>
              <p>{t(member.roleKey)}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Staff;
