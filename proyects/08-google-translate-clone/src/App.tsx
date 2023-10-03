import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useStore } from "./hooks/useStore";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import { AUTO_LANGUAJE } from "./constants";
import { ArrowsIcon } from "./components/Icons";
import { LanguajeSelector } from "./components/LanguajeSelector";
import { SectionType } from "./types.d";
import { TextArea } from "./components/TextArea";

function App() {
  const {
    loading,
    fromLanguaje,
    toLanguaje,
    fromText,
    result,
    interchangeLanguajes,
    setFromLanguaje,
    setToLanguaje,
    setFromText,
    setResult,
  } = useStore();
  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguajeSelector
              type={SectionType.From}
              value={fromLanguaje}
              onChange={setFromLanguaje}
            />
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>
        <Col xs="auto">
          <Button
            variant="link"
            disabled={fromLanguaje === AUTO_LANGUAJE}
            onClick={interchangeLanguajes}
          >
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguajeSelector
              type={SectionType.To}
              value={toLanguaje}
              onChange={setToLanguaje}
            />
            <TextArea
            loading={loading}
              type={SectionType.To}
              value={result}
              onChange={setResult}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
