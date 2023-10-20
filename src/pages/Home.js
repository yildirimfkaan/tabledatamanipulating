import React, { useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBTooltip,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { deleteUserStart, loadCampaignsStart, loadCampaignsSuccess, loadUsersStart } from "../redux/actions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const { users, loading, campaigns } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(loadUsersStart());
    dispatch(loadCampaignsStart());
  }, []);

  if (loading) {
    return (
      <MDBSpinner style={{ marginTop: "150px" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure that you wanted to delete user ?")) {
      dispatch(deleteUserStart(id));
      toast.success("User Delete Successfully");
    }
  };
  console.log(campaigns)

  return (
    <div className="container" style={{ marginTop: "150px" }}>
       <div class="d-flex justify-content-end mb-4">
        <div class="form-outline">
          <input data-search="" data-target="#table_inputs" type="text" id="search_table_inputs" class="form-control"></input>
            <label class="form-label" for="search_table_inputs">Search</label>
        </div>
        <button class="btn btn-primary btn-sm ml-3" data-add-entry="" data-target="#table_inputs">
          <i class="fa fa-plus"></i>
        </button>
      </div>
      <hr/>
        <div id="table_inputs"></div>
      {/* <MDBTable>
        <MDBTableHead dark>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Budget</th>
            <th scope="col">Spend</th>
            <th scope="col">CTR</th>
            <th scope="col">Add to Cart</th>
            <th scope="col">Impressions</th>
          </tr>
        </MDBTableHead>
        {campaigns &&
          campaigns.map((item, index) => (
            <MDBTableBody>
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.budget}</td>
                <td>{item.spend}</td>
                <td>{item.ctr}</td>
                <td>{item.addtoCart}</td>
                <td>{item.impressions}</td>
                <td>
                  <MDBBtn
                    className="m-1"
                    tag="a"
                    color="none"
                    onClick={() => handleDelete(item.id)}
                  >
                    {" "}
                    <MDBTooltip title="Delete" tag="a">
                      <MDBIcon
                        fas
                        icon="trash"
                        style={{ color: "#dd4b39" }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </MDBBtn>{" "}
                  <Link to={`/editUser/${item.id}`}>
                    <MDBTooltip title="Edit" tag="none">
                      <MDBIcon
                        fas
                        icon="pen"
                        style={{ color: "#55acee", marginBottom: "10px" }}
                        size="lg"
                      />
                    </MDBTooltip>
                  </Link>{" "}
                  <Link to={`/userInfo/${item.id}`}>
                    <MDBTooltip title="View" tag="none">
                      <MDBIcon
                        fas
                        icon="eye"
                        size="lg"
                        style={{ color: "#3b5998", marginBottom: "10px" }}
                      />
                    </MDBTooltip>
                  </Link>
                </td>
              </tr>
            </MDBTableBody>
          ))}
      </MDBTable> */}
     

    </div>
  );
};

export default Home;
