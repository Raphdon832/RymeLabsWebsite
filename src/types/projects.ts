export type ProjectIntake = {
  id: string;
  serviceType: string;
  budget: string;
  name: string;
  email: string;
  details: string;
  status: string;
  stage: string;
  createdAt: string;
  updatedAt?: string;
  source: string;
};

export type CreateProjectPayload = {
  serviceType: string;
  budget: string;
  name: string;
  email: string;
  details?: string;
};
