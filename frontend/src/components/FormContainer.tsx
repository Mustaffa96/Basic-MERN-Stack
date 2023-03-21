import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export const FormContainer = ({ children }: { children: any }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sx={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;