import { ProjectForm } from "@/common.types";
import {
  createProjectMutation,
  createUserMutation,
  getProjectByIdQuery,
  deleteProjectMutation,
  updateProjectMutation,
  getProjectsOfUserQuery,
  getUserQuery,
  projectsQuery,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";
import { categoryFilters } from "@/constants";

const isProduction = process.env.NODE_ENV === "production";

const apiUrl = isProduction
  ? process.env.GRAFBASE_API_URL || ""
  : " http://127.0.0.1:4000/graphql";

const apiKey = isProduction ? process.env.GRAFBASE_API_KEY || "" : "1234";

const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

export const fetchToken = async () => {
  try {
    const res = await fetch(`${serverUrl}/api/auth/token`);
    return res.json();
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (imagePath: string) => {
  try {
    const res = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });
    return res.json();
  } catch (error) {
    throw error;
  }
};

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    throw err;
  }
};

export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);

  const variables = {
    input: {
      name: name,
      email: email,
      avatarUrl: avatarUrl,
    },
  };

  return makeGraphQLRequest(createUserMutation, variables);
};

export const getUser = (email: string) => {
  client.setHeader(`x-api-key`, apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);
    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};

// export const fetchAllProjects = async (
//   category?: string,
//   endcursor?: string
// ) => {
//   client.setHeader(`x-api-key`, apiKey);

//   return makeGraphQLRequest(projectsQuery, { category, endcursor });
// };
export const fetchAllProjects = (
  category?: string | null,
  endcursor?: string | null
) => {
  client.setHeader("x-api-key", apiKey);

  const categories = category == null ? categoryFilters : [category];

  return makeGraphQLRequest(projectsQuery, { categories, endcursor });
};

export const getProjectDetails = (id: string) => {
  client.setHeader(`x-api-key`, apiKey);
  return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const getUserProjects = (id: string, last?: number) => {
  client.setHeader(`x-api-key`, apiKey);
  return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};
