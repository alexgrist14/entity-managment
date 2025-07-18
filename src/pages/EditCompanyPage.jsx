import { useParams } from "react-router";
import CompanyForm from "../features/components/CompanyForm";

const EditCompanyPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h2>Edit Company #{id}</h2>
      <CompanyForm mode="edit" companyId={id} />
    </div>
  );
};
export default EditCompanyPage;
