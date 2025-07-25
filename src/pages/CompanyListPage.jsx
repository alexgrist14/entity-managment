import { useEffect, useState } from "react";
import { Link } from "react-router";
import Button from "../shared/ui/Button/Button";
import Table from "../shared/ui/Table/Table";
import axios from "axios";
import { API_URL } from "../shared/utils/api";

const CompanyListPage = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/companies`)
      .then((res) => setCompanies(res.data))
      .catch((err) => {
        console.error("Failed to fetch companies:", err);
      });
  }, []);

  return (
    <div>
      <div>
        <h2>Companies</h2>
        <Link to="/companies/create">
          <Button>Create</Button>
        </Link>
      </div>
      <Table
        headers={{
          name: "Name",
          industry: "Industry",
          address: "Address",
          contact_email: "Email",
          description: "Desc",
          advanced_type: "Type",
          advanced_note: "Note",
          tasks: "Tasks",
          controls: "Controls",
        }}
        rows={
          companies?.map((company) => ({
            ...company,
            tasks: company.Tasks?.map((task) => task.name).join(", "),
            controls: (
              <Link to={`/companies/${company.id}/edit`}>
                <Button color="edit">Edit</Button>
              </Link>
            ),
          })) || []
        }
      />
    </div>
  );
};
export default CompanyListPage;
