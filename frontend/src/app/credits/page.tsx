import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Header from "../_components/header";

const tabs = [
  {
    value: "default",
    label: "General lending conditions",
  },
  {
    value: "confirmed",
    label: "With confirmation of the intended use of the loan",
  },
  {
    value: "confirmed-car",
    label:
      "For the purchase of a car with confirmation of the intended use of the loan",
  },
  {
    value: "loyal-clients",
    label: "For our loyal clients",
  },
];

export default function CreditsPage() {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        <Tabs defaultValue="account" defaultValue={tabs.at(0)?.value}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="p-4">
              {tab.label}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
}
