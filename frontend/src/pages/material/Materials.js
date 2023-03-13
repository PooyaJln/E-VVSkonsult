import { useEffect, useState } from "react";
import { Table, Row, Col, Tooltip, Text } from "@nextui-org/react";

import { DeleteIcon } from "../../templates/DeleteIcon";
import { EditIcon } from "../../templates/EditIcon";
import { IconButton } from "../../templates/IconButton";

const Materials = () => {
  const [materials, setMaterials] = useState(null);

  useEffect(() => {
    let allMaterialsURI = "http://localhost:4001/heat-loss/components/all";
    const fetchMaterials = async () => {
      const response = await fetch(allMaterialsURI);
      const responseJson = await response.json();
      if (response.ok) {
        setMaterials(responseJson);
      }
    };

    fetchMaterials();
  }, []);

  let columns = [
    { key: "materialName", label: "Name" },
    { key: "materialCategory", label: "Category" },
    { key: "materialValue", label: "u-Value [W/m2.K]" },
    { key: "materialQinf", label: "q" },
    { key: "ACTIONS", label: "" },
  ];

  return (
    <div className="project">
      <p>Materials main page.</p>

      <Table
        bordered
        lined
        headerLined
        sticked
      >
        <Table.Header columns={columns}>
          {(column) =>
            column.key !== "materialQinf" ? (
              <Table.Column key={column.key}>{column.label}</Table.Column>
            ) : (
              <Table.Column key={column.key}>
                {column.label} <sub>inf</sub> [l/s.m<sup>2</sup>]
              </Table.Column>
            )
          }
        </Table.Header>

        <Table.Body items={materials}>
          {materials &&
            materials.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{item.component_name}</Table.Cell>
                <Table.Cell>{item.component_categ}</Table.Cell>
                <Table.Cell>{item.component_uvalue}</Table.Cell>
                <Table.Cell>
                  {item["thermalParameter"] &&
                    item["thermalParameter"]["parameter_value"]}
                </Table.Cell>

                <Table.Cell>
                  <Row>
                    <Col css={{ d: "flex" }}>
                      <Tooltip
                        content="Edit"
                        color="invert"
                        placement="rightEnd"
                      >
                        <IconButton
                          onClick={() => console.log("Edit item", item)}
                        >
                          <EditIcon size={20} fill="#979797" />
                        </IconButton>
                      </Tooltip>
                    </Col>
                    <Col css={{ d: "flex" }}>
                      <Tooltip
                        placement="rightEnd"
                        content="Delete"
                        color="error"
                        onClick={() => console.log("Delete item", item)}
                      >
                        <IconButton>
                          <DeleteIcon size={20} fill="#FF0080" />
                        </IconButton>
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

export default Materials;
