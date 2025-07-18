import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router";
import Button from "../../shared/ui/Button/Button";
import Input from "../../shared/ui/Input/Input";
import ContentWithTitle from "../../shared/ui/ContentWithTitle/ContentWithTitle";
import styles from "./CompanyForm.module.css";
import Error from "../../shared/ui/Error/Error";
import Radio from "../../shared/ui/Radio/Radio";
import Dropdown from "../../shared/ui/Dropdown/Dropdown";
import axios from "axios";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  address: yup.string().max(100, "Max 100 characters"),
  advanced_type: yup.string().required("Type is required"),
  advanced_note: yup.string().nullable(true),
  industry: yup.string().required("Industry is required"),
  description: yup.string().nullable(true),
  contactPreference: yup.string(),
  contact_email: yup
    .string()
    .when("contactPreference", {
      is: "email",
      then: (schema) => schema.required("Email is required"),
    })
    .nullable(true),
  Tasks: yup.array().of(
    yup.object({
      name: yup.string().required("Task name required"),
      status: yup.string().required("Task status required"),
    })
  ),
});

const CompanyForm = ({ mode, companyId }) => {
  const navigate = useNavigate();
  const [defaultValues, setDefaultValues] = useState({
    name: "",
    address: "",
    advanced_type: "",
    advanced_note: "",
    industry: "",
    description: "",
    contactPreference: "none",
    contact_email: "",
    Tasks: [],
  });
  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "Tasks",
  });

  const contactPreference = watch("contactPreference");

  useEffect(() => {
    if (mode === "edit" && companyId) {
      axios
        .get(`http://localhost:3111/api/companies/${companyId}`)
        .then((res) => {
          const { id: _, ...parsedData } = res.data;
          reset({
            ...parsedData,
            contactPreference: parsedData.contact_email ? "email" : "none",
          });
          setDefaultValues(parsedData);
        })
        .catch((err) => {
          console.error("Failed to fetch company:", err);
        });
    }
  }, [mode, companyId, reset]);

  const onSubmit = async (data) => {
    const transformedData = {
      name: data.name,
      address: data.address || null,
      advanced_type: data.advanced_type || null,
      advanced_note: data.advanced_note || null,
      industry: data.industry,
      description: data.description || null,
      contact_email:
        data.contactPreference === "email" ? data.contact_email : null,
      Tasks: data.Tasks,
    };

    const payload = Object.keys(transformedData).reduce((res, key) => {
      const defaultVal = defaultValues[key];
      const currentVal = transformedData[key];

      const normalize = (val) => (val === "" ? null : val);

      const isChanged =
        JSON.stringify(normalize(currentVal)) !==
        JSON.stringify(normalize(defaultVal));

      if (isChanged) {
        res[key] = currentVal;
      }

      return res;
    }, {});

    const method = mode === "edit" ? "PATCH" : "POST";
    const url =
      mode === "edit"
        ? `http://localhost:3111/api/companies/${companyId}`
        : "http://localhost:3111/api/companies";

    await axios({
      method,
      url,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/companies");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Link className={styles.link} to="/companies">
        <Button>Back to List</Button>
      </Link>
      <div className={styles.form__wrapper}>
        <ContentWithTitle title={"Name*"}>
          <Input {...register("name")} />
          <Error message={errors.name?.message} />
        </ContentWithTitle>
        <ContentWithTitle title={"Address"}>
          <Input {...register("address")} />
          <Error message={errors.address?.message} />
        </ContentWithTitle>
      </div>

      <div className={styles.form__wrapper}>
        <ContentWithTitle title={"Type*"}>
          <Dropdown
            selectedId={watch("advanced_type")}
            onSelect={(id) => {
              setValue("advanced_type", id);
              trigger("advanced_type");
            }}
            list={[
              { id: "", content: "None" },
              { id: "Startup" },
              { id: "Enterprise" },
              { id: "AI" },
              { id: "Cloud" },
            ]}
          />
          <Error message={errors.advanced_type?.message} />
        </ContentWithTitle>
        <ContentWithTitle title={"Industry*"}>
          <Dropdown
            selectedId={watch("industry")}
            onSelect={(id) => {
              setValue("industry", id);
              trigger("industry");
            }}
            list={[
              { id: "", content: "None" },
              { id: "Tech" },
              { id: "Finance" },
              { id: "Education" },
              { id: "Healthcare" },
            ]}
          />
          <Error message={errors.industry?.message} />
        </ContentWithTitle>
      </div>

      <ContentWithTitle title={"Description"}>
        <Input {...register("description")} />
      </ContentWithTitle>

      <ContentWithTitle title={"Note"}>
        <Input {...register("advanced_note")} />
      </ContentWithTitle>

      <ContentWithTitle title={"Contact Preference"}>
        <Radio
          label="None"
          value="none"
          id="none"
          {...register("contactPreference")}
        />{" "}
        <Radio
          value="email"
          id="email"
          label="Email"
          {...register("contactPreference")}
        />{" "}
      </ContentWithTitle>

      {contactPreference === "email" && (
        <ContentWithTitle title={"Contact Email*"}>
          <Input {...register("contact_email")} />
          <Error message={errors.contact_email?.message} />
        </ContentWithTitle>
      )}

      <ContentWithTitle title={"Tasks"}>
        {fields.map((task, index) => (
          <div key={task.id} className={styles.form__task}>
            <Input
              placeholder="Task Name"
              {...register(`Tasks.${index}.name`)}
            />
            <Error message={errors.Tasks?.[index]?.name?.message} />
            <div className={styles.form__status}>
              <Dropdown
                selectedId={watch(`Tasks.${index}.status`)}
                onSelect={(id) => {
                  setValue(`Tasks.${index}.status`, id);
                  trigger(`Tasks.${index}.status`);
                }}
                list={[
                  { id: "", content: "None" },
                  { id: "todo", content: "Todo" },
                  { id: "in progress", content: "In Progress" },
                  { id: "done", content: "Done" },
                ]}
              />
              <Button onClick={() => remove(index)}>Remove</Button>
            </div>
            <Error message={errors.Tasks?.[index]?.status?.message} />
          </div>
        ))}
        <Button type="button" onClick={() => append({ name: "", status: "" })}>
          Add Task
        </Button>
      </ContentWithTitle>

      <div>
        <Button type="submit">{mode === "edit" ? "Update" : "Create"}</Button>
      </div>
    </form>
  );
};

export default CompanyForm;
