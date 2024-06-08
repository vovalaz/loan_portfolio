import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Header from "./_components/header";
import { Separator } from "~/components/ui/separator";
import { creditTypeService } from "~/services/creditTypeService";

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

export default async function Home() {
  const creditTypes = await creditTypeService.getAll();

  return (
    <>
      <Header />
      <div className="my-4 flex flex-col items-center">
        <Tabs
          className="flex flex-col items-center"
          defaultValue={creditTypes.at(0)?.id.toString()}
        >
          <TabsList>
            {creditTypes.map((creditType) => (
              <TabsTrigger key={creditType.id} value={creditType.id.toString()}>
                {creditType.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {creditTypes.map((creditType) => (
            <TabsContent
              key={creditType.id}
              value={creditType.id.toString()}
              className="flex flex-col items-center gap-4 self-center p-4"
            >
              <div className="text-2xl font-bold">{creditType.name}</div>
              <div className="flex flex-col gap-4 bg-gray-50 p-4">
                <div className="flex justify-between gap-4">
                  <div>Сума кредиту</div>
                  <div>
                    від {creditType.min_amount} до {creditType.max_amount} грн
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between gap-4">
                  <div>Строк кредиту</div>
                  <div>
                    від {creditType.min_term_months} до{" "}
                    {creditType.max_term_months} місяців
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between gap-4">
                  <div>Процентна ставка</div>
                  <div>
                    від{" "}
                    {Math.floor(Number(creditType.rate) * 100 * 12) > 56
                      ? 56
                      : Math.floor(Number(creditType.rate) * 100 * 12)}{" "}
                    % річних
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
          {/* 
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
          ))} */}
        </Tabs>
      </div>
    </>
  );
}
