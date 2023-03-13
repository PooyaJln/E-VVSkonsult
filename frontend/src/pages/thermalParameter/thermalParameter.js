import { useEffect, useState, Fragment } from "react";
import {
  Table,
  Row,
  Col,
  Tooltip,
  User,
  Text,
  useTheme,
} from "@nextui-org/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const ThermalParameter = () => {
  // let thermalParameters = [
  //   {
  //     parameter_name: "Specific infiltration flow",
  //     parameter_value: "",
  //     parameter_unit: "l/s.m<sup>2</sup>",
  //   },
  //   {
  //     parameter_name: "thermal_bridge_coeff",
  //     parameter_value: "",
  //     parameter_unit: null,
  //   },
  //   {
  //     parameter_name: "air density",
  //     parameter_value: "",
  //     parameter_unit: "unit 3",
  //   },
  //   {
  //     parameter_name: "specific heat capacity",
  //     parameter_value: "",
  //     parameter_unit: "unit 4",
  //   },
  // ]

  const [thermalParameters, setThermalParameters] = useState([
    {
      parameter_name: "Specific infiltration flow",
      parameter_value: "",
      parameter_unit: (
        <span>
          l/s.m<sup>2</sup>
        </span>
      ),
    },
    {
      parameter_name: "thermal bridge coeff",
      parameter_value: "",
      parameter_unit: null,
    },
    {
      parameter_name: "air density",
      parameter_value: "",
      parameter_unit: "unit 3",
    },
    {
      parameter_name: "specific heat capacity",
      parameter_value: "",
      parameter_unit: "unit 4",
    },
  ]);
  let tempParams = [];
  useEffect(() => {
    let allThermalParametersURI =
      "http://localhost:4001/heat-loss/thermal-parameters";

    // let _thermalParameters = [];
    // fetch(allThermalParametersURI)
    // .then(res => {return res.json()})
    // .then(data => {
    //   thermalParameters.forEach(item => {
    //     const value = data.find(y => y.parameter_name === item.parameter_name)?.parameter_value;

    //     if (value) {
    //       item["parameter_value"] = value;
    //     }

    //     _thermalParameters.push(item)

    //   })
    // })

    // console.log("_thermalParameters: ", _thermalParameters)
    // setThermalParameters(_thermalParameters)

    const fetchThermalParameters = async () => {
      const response = await fetch(allThermalParametersURI);
      const responseJson = await response.json();

      if (response.ok) {
        thermalParameters.forEach((item) => {
          responseJson.forEach((_item) => {
            if (item.parameter_name == _item.parameter_name) {
              item["parameter_value"] = _item.parameter_value;
              tempParams.push(item);
              // let index = tempParams.indexOf(item)
              // tempParams[index]["parameter_value"] = _item.parameter_value
            }
          });
        });
        setThermalParameters(tempParams);
      }
    };
    fetchThermalParameters();
  }, []);

  let columns = [
    { key: "parameter", label: "Parameter" },
    { key: "value", label: "Value" },
    { key: "unit", label: "Unit" },
    { key: "ACTIONS", label: "" },
  ];

  // let thermalParametersTitles = [
  //   "Specific infiltration flow",
  //   "thermal_bridge_coeff",
  //   "air density",
  //   "specific heat capacity",
  // ];

  return (
    <div className="thermalparameter">
      <p>ThermalParameters main page.</p>
      <Table bordered lined headerLined sticked>
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.key}>{column.label}</Table.Column>
          )}
        </Table.Header>
        <Table.Body>
          {thermalParameters &&
            thermalParameters.map((parameter, index) => (
              <Table.Row key={index}>
                <Table.Cell>{parameter.parameter_name}</Table.Cell>
                <Table.Cell>{parameter.parameter_value}</Table.Cell>
                <Table.Cell>{parameter.parameter_unit}</Table.Cell>
                <Table.Cell>
                  <Row>
                    <Col>
                      <Tooltip content="Edit" placement="left" color="default">
                        <FontAwesomeIcon
                          onClick={() => console.log("Edit item")}
                          icon={faPenToSquare}
                        />
                      </Tooltip>
                    </Col>
                    <Col>
                      <Tooltip content="Save" placement="right" color="default">
                        <FontAwesomeIcon
                          onClick={() => console.log("Save item")}
                          icon={faFloppyDisk}
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ThermalParameter;
