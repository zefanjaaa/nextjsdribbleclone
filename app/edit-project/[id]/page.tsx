import { ProjectInterface } from "@/common.types";
import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { getProjectDetails } from "@/lib/actions";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = await getCurrentUser();

  if (!session) redirect("/");

  const res = (await getProjectDetails(id)) as { project?: ProjectInterface };
  return (
    <Modal>
      <h3 className="modal-head-text">Edit project</h3>
      <ProjectForm type="edit" session={session} project={res?.project} />
    </Modal>
  );
};

export default EditProject;
