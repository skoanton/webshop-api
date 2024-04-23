import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

type AlertsProps = {};

const Alerts = ({}: AlertsProps) => {
  return (
    <>
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>Test alert</AlertDescription>
      </Alert>
    </>
  );
};

export default Alerts;
