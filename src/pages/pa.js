import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getClientBindingRequest,
  clientBindingSelector,
  getClientsRequest,
  clientsSelector,
  studyGroupSelector,
  getStudyGroupRequest,
  addFeatureBindingRequest,
  addClientBindingRequest,
  getFeatureBindingRequest,
  featureBindingSelector,
  addMatrixBindingRequest,
  getMatrixBindingRequest,
  matrixBindingSelector,
} from "../app/paSlice";
import Switch from "@material-ui/core/Switch";
import SimpleModal from "../components/model";
import history from "../history";

const getValueById = (arr, id) => {
  let label = "";
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].value === id) {
      label = arr[i].label;
      break;
    }
  }

  return label;
};

export default function PAComponent() {
  const [open, setOpen] = useState(false);
  const clientBinding = useSelector(clientBindingSelector);
  const clientsList = useSelector(clientsSelector);
  const studyGroupList = useSelector(studyGroupSelector);
  const featureBinding = useSelector(featureBindingSelector);
  const matrixBinding = useSelector(matrixBindingSelector);
  const dispatch = useDispatch();
  const { client_id } = useParams();
  console.log(client_id);
  useEffect(() => {
    dispatch(getClientBindingRequest("b1d59edf-d6f3-4c55-8570-e5a29513806f"));
    dispatch(getClientsRequest());
    dispatch(getStudyGroupRequest());
    dispatch(getFeatureBindingRequest("b1d59edf-d6f3-4c55-8570-e5a29513806f"));
    dispatch(getMatrixBindingRequest("b1d59edf-d6f3-4c55-8570-e5a29513806f"));
  }, []);

  return (
    <>
      <SimpleModal
        open={open}
        handleClose={setOpen}
        clientsList={clientsList}
        studyGroupList={studyGroupList}
        clientBinding={clientBinding}
        handleSubmit={(client, study_group) =>
          dispatch(
            addClientBindingRequest({
              client,
              study_group,
            })
          )
        }
      />
      <div
        style={{
          backgroundColor: "#E8E8E8",
          width: "100%",
          height: "100vh",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            margin: "20px",
          }}
        >
          <h1>Performance Analytics Administration</h1>
        </div>
        <div
          style={{
            backgroundColor: "white",
            margin: "10px 50px",
            height: "70px",
            fontWeight: "bold",
          }}
        >
          <div
            style={{
              padding: "10px 20px",
            }}
          >
            Client Binding
            <div
              style={{
                padding: "10px 0px",
              }}
            >{`${getValueById(
              clientsList,
              clientBinding.client
            )} is to bound to id ${getValueById(
              studyGroupList,
              clientBinding.study_group
            )}`}</div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            margin: "10px 50px",
            height: "50px",
            fontWeight: "bold",
          }}
        >
          <div
            style={{
              padding: "10px 20px",
              color: "blue",
              fontWeight: "normal",
            }}
            onClick={() => setOpen(true)}
          >
            Edit Client Binding
          </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            margin: "10px 50px",
            height: "50px",
            fontWeight: "bold",
          }}
        >
          <div
            style={{
              padding: "10px 20px",
              color: "blue",
              fontWeight: "normal",
            }}
          >
            Edit Subscription
          </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            margin: "10px 50px",
            height: "50px",
            fontWeight: "bold",
          }}
        >
          <div
            style={{
              padding: "10px 20px",
            }}
          >
            Features
          </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            margin: "10px 50px",
            fontWeight: "bold",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "10px 20px",
              fontWeight: "normal",
              overflow: "auto",
              flexDirection: "column",
            }}
          >
            <div>
              <Switch
                checked={featureBinding.forecast}
                onChange={(e) =>
                  dispatch(
                    addFeatureBindingRequest({
                      client: "b1d59edf-d6f3-4c55-8570-e5a29513806f",
                      forecast: !featureBinding.forecast,
                      reforecast: featureBinding.reforecast,
                      portfolioView: featureBinding.portfolioView,
                    })
                  )
                }
                name="feature-forecast"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <span>Forecast</span>
            </div>
            <div>
              <Switch
                checked={featureBinding.reforecast}
                onChange={(e) =>
                  dispatch(
                    addFeatureBindingRequest({
                      client: "b1d59edf-d6f3-4c55-8570-e5a29513806f",
                      forecast: featureBinding.forecast,
                      reforecast: !featureBinding.reforecast,
                      portfolioView: featureBinding.portfolioView,
                    })
                  )
                }
                name="feature-reforecast"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <span>ReForecast</span>
            </div>
            <div>
              <Switch
                checked={featureBinding.portfolioView}
                onChange={(e) =>
                  dispatch(
                    addFeatureBindingRequest({
                      client: "b1d59edf-d6f3-4c55-8570-e5a29513806f",
                      forecast: featureBinding.forecast,
                      reforecast: featureBinding.reforecast,
                      portfolioView: !featureBinding.portfolioView,
                    })
                  )
                }
                name="feature-portfolio-view"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <span>Portfolio View</span>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            margin: "10px 50px",
            height: "50px",
            fontWeight: "bold",
          }}
        >
          <div
            style={{
              padding: "10px 20px",
            }}
          >
            Individual Matrics
          </div>
        </div>
        <div
          style={{
            backgroundColor: "white",
            margin: "10px 50px",
            fontWeight: "bold",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "10px 20px",
              fontWeight: "normal",
              overflow: "auto",
              flexDirection: "column",
            }}
          >
            <div>
              <Switch
                checked={matrixBinding.ctms_matrix}
                onChange={() =>
                  dispatch(
                    addMatrixBindingRequest({
                      client: "b1d59edf-d6f3-4c55-8570-e5a29513806f",
                      ctms_matrix: !matrixBinding.ctms_matrix,
                      design_optimization_matrix:
                        matrixBinding.design_optimization_matrix,
                      cost_matrix: matrixBinding.cost_matrix,
                    })
                  )
                }
                name="matrics-ctms-matrics"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <span>CTMS matrics</span>
            </div>
            <div>
              <Switch
                checked={matrixBinding.design_optimization_matrix}
                onChange={() =>
                  dispatch(
                    addMatrixBindingRequest({
                      client: "b1d59edf-d6f3-4c55-8570-e5a29513806f",
                      ctms_matrix: matrixBinding.ctms_matrix,
                      design_optimization_matrix: !matrixBinding.design_optimization_matrix,
                      cost_matrix: matrixBinding.cost_matrix,
                    })
                  )
                }
                name="matrics-design-optimization-matrics"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <span>Design Optimization matrics</span>
            </div>
            <div>
              <Switch
                checked={matrixBinding.cost_matrix}
                onChange={() =>
                  dispatch(
                    addMatrixBindingRequest({
                      client: "b1d59edf-d6f3-4c55-8570-e5a29513806f",
                      ctms_matrix: matrixBinding.ctms_matrix,
                      design_optimization_matrix:
                        matrixBinding.design_optimization_matrix,
                      cost_matrix: !matrixBinding.cost_matrix,
                    })
                  )
                }
                name="matrics-cost-matrics"
                inputProps={{ "aria-label": "secondary checkbox" }}
              />
              <span>Cost Matrics</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
