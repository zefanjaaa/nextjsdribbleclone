"use client";
import { SessionInterface } from "@/common.types";

type Props = {
  type: string;
  session: SessionInterface;
};

const image = null;

const ProjectForm = ({ type, session }: Props) => {
  const handleSubmit = (event: React.FormEvent) => {};
  return (
    <form onSubmit={handleSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!image && "Choose a poster"}
        </label>
      </div>
    </form>
  );
};

export default ProjectForm;
