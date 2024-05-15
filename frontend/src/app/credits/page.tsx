import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Header from "../_components/header";
import { Separator } from "~/components/ui/separator";

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
        <Tabs className="flex flex-col items-center" defaultValue="default">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent
              key={tab.value}
              value={tab.value}
              className="flex w-1/2 flex-col items-center gap-4 self-center p-4"
            >
              <div className="text-2xl font-bold">Умови</div>
              <div className="flex flex-col gap-4 bg-gray-50 p-4">
                <div className="flex justify-between gap-4">
                  <div>Сума кредиту</div>
                  <div>від 30 000 до 250 000 грн</div>
                </div>
                <Separator />
                <div className="flex justify-between gap-4">
                  <div>Строк кредиту</div>
                  <div>від 1 до 5 років</div>
                </div>
                <Separator />
                <div className="flex justify-between gap-4">
                  <div>Процентна ставка</div>
                  <div>
                    56 % річних (Процентна ставка може бути встановлена у
                    розмірі від 36%*)
                  </div>
                </div>
              </div>
              <div>
                *Процентна ставка може бути встановлена у розмірі 36% річних
                починаючи з 31-го календарного дня користування кредитом - за
                умови надання Клієнтом в строк не пізніше 25-го календарного дня
                (включно) з дати отримання кредиту підтверджуючих документів
                щодо цільового використання коштів на придбання автомобіля
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
}
