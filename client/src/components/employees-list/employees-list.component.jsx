import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import MaterialTable from 'material-table';
import './employees-list.styles.css';
import { forwardRef } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {CompanyContext} from "../../contexts/company.context";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const EmployeesList = () => {

    const { company } = useContext(CompanyContext);

    const [state, setState] = useState({
        columns: [
            { title: 'Display name', field: 'displayName' },
            { title: 'Email', field: 'email' },
            { title: 'Is confirmed', field: 'confirmed' }
        ],
        data: company.employees
    });

    return (
        <div style={{ width: '100%' }}>
            <Formik
                initialValues={{ email: "" }}
                onSubmit={async values => {
                    axios.post('/api/company/employee', { email: values.email })
                        .then(() => window.location.reload());
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email()
                        .required("Required")
                })}
            >
                {props => {
                    const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset
                    } = props;
                    return (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="email" style={{ display: "block" }}>
                                Employee email address
                            </label>
                            <input
                                id="email"
                                placeholder="Enter employee email"
                                type="text"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                    errors.email && touched.email
                                        ? "text-input error"
                                        : "text-input"
                                }
                            />
                            {errors.email && touched.email && (
                                <div className="input-feedback">{errors.email}</div>
                            )}

                            <button
                                type="button"
                                className="outline"
                                onClick={handleReset}
                                disabled={!dirty || isSubmitting}
                            >
                                Reset
                            </button>
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                    );
                }}
            </Formik>
            <MaterialTable
              isLoading={state.loading}
              title="Employees"
              columns={state.columns}
              data={state.data}
              icons={tableIcons}
              actions={[
                  {
                      icon: DeleteOutline,
                      tooltip: 'Delete User',
                      onClick: (event, employee) => {
                          const confirmed = window.confirm(`Are you sure you want to remove ${employee.displayName}?`);
                          if (confirmed) {
                              axios.delete('/api/company/employee', { data: { employeeEmail: employee.email }})
                                  .then(() => window.location.reload());
                          }
                      }
                  }
              ]}
            />
        </div>
    );
};

export default EmployeesList;
