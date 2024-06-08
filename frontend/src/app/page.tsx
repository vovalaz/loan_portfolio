import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Header from "./_components/header";
import { Separator } from "~/components/ui/separator";
import { creditTypeService } from "~/services/creditTypeService";
import { Circle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import Yulia from "~/assets/yulia.png";
import Image from "next/image";

export default async function Home() {
  const creditTypes = await creditTypeService.getAll();

  return (
    <>
      <Header />
      <div className="flex flex-col gap-10">
        <div className="flex h-[66vh] items-center justify-between bg-[#c0c0c0] px-[20%]">
          <div>
            <div className="text-4xl font-bold">
              Welcome to the bank of the future
            </div>
            <div className="text-2xl">
              We offer a wide range of credit products to meet your needs
            </div>
          </div>
          <div>
            <Image src={Yulia} alt="Yulia" height={550} width={550} />
          </div>
        </div>
        <div className="my-4 flex flex-col items-center gap-40">
          {creditTypes.length > 0 && (
            <Tabs
              className="flex flex-col items-center"
              defaultValue={creditTypes.at(0)?.id.toString()}
            >
              <TabsList>
                {creditTypes.map((creditType) => (
                  <TabsTrigger
                    key={creditType.id}
                    value={creditType.id.toString()}
                  >
                    {creditType.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {creditTypes.map((creditType) => (
                <TabsContent
                  key={creditType.id}
                  value={creditType.id.toString()}
                  className="flex w-[700px] flex-col items-center gap-4 self-center p-4"
                >
                  <div className="text-2xl font-bold">{creditType.name}</div>
                  <div className="flex w-full flex-col gap-4 bg-gray-50 p-4">
                    <div className="flex justify-between gap-4">
                      <div>Credit amount</div>
                      <div>
                        From {creditType.min_amount} To {creditType.max_amount}{" "}
                        UAH
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between gap-4">
                      <div>Credit Term</div>
                      <div>
                        From {creditType.min_term_months} To{" "}
                        {creditType.max_term_months} months
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between gap-4">
                      <div>Credit Rate</div>
                      <div>
                        From{" "}
                        {Math.floor(Number(creditType.rate) * 100 * 12) > 56
                          ? 56
                          : Math.floor(Number(creditType.rate) * 100 * 12)}{" "}
                        % yearly
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
          <div className="max-w-[700px]">
            *Процентна ставка може бути встановлена у розмірі 36% річних
            починаючи з 31-го календарного дня користування кредитом - за умови
            надання Клієнтом в строк не пізніше 25-го календарного дня (включно)
            з дати отримання кредиту підтверджуючих документів щодо цільового
            використання коштів на придбання нерухомості, товарів та послуг щодо
            встановлення додаткового обладнання в мережах офіційних
            автосалонів/станцій технічного обслуговування, медичних товарів та
            послуг (стоматологічні послуги в т.ч. протезування), вікон, дверей,
            матеріалів для покрівлі та робіт по встановленню/демонтажу,
            каркасних, модульних споруд/будинків та робіт по встановленню,
            теплових котлів, сонячних панелей, бойлерів, генераторів
          </div>
          <div className="flex max-w-[900px] flex-col items-center">
            <div className="text-2xl font-bold">Warnings</div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div>
                  <Circle />
                </div>
                <div>
                  The client has the opportunity to repay the loan early
                </div>
              </div>

              <div className="flex gap-4">
                <div>
                  <Circle />
                </div>
                <div>
                  There are no penalties for early repayment of the loan
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <Circle />
                </div>
                <div>
                  The consumer loan agreement may be amended or terminated by
                  mutual agreement of the Parties or in cases expressly provided
                  for by law
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <Circle />
                </div>
                <div>
                  Any amendments to the consumer loan agreement, as well as
                  termination of the of the consumer loan agreement shall be
                  made in the form of additional agreements to the consumer loan
                  agreement
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <Circle />
                </div>
                <div>
                  The bank is prohibited from require the client to purchase any
                  goods or services from the bank or a related or affiliated
                  person as a mandatory condition of the loan service condition
                  for the provision of a loan service (except for the provision
                  of a package of of banking services)
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <Circle />
                </div>
                <div>
                  In case of non-fulfillment by the client of obligations under
                  the agreement, the Bank, in accordance with the terms of the
                  agreement and the current legislation legislation, has the
                  right to demand compensation for damages in the form of in the
                  form of a penalty (fine, penalty)
                </div>
              </div>

              <div className="flex gap-4">
                <div>
                  <Circle />
                </div>
                <div>
                  The Bank is not entitled to make changes to agreements
                  concluded with customers unilaterally, unless otherwise is not
                  provided for by the agreement or the law
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <Circle />
                </div>
                <div>
                  The client has the opportunity to to refuse to receive
                  advertising materials by means of remote communication
                  channels
                </div>
              </div>
              <div className="flex gap-4">
                <div>
                  <Circle />
                </div>
                <div>
                  The client has the right after termination of the agreement on
                  the provision of banking services, including in connection
                  with the expiration termination, termination or fulfillment of
                  such agreement, to apply to to the bank with a request for
                  information (certificate) regarding the fulfillment of
                  fulfillment by the parties of their obligations under the
                  agreement, including information (certificate) on the absence
                  of debt and fulfillment of the client&apos;s obligations under
                  the agreement in full, which the bank provides in in the form
                  of a paper or electronic document (at the client&apos;s
                  option) within five business days from the date of receipt of
                  such request by the bank.
                </div>
              </div>
            </div>
          </div>
          <div>
            <Accordion type="multiple">
              <AccordionItem value="item-1" className="w-[800px]">
                <AccordionTrigger>Can I repay my loan early?</AccordionTrigger>
                <AccordionContent>
                  Yes, you have the opportunity to repay your loan early. There
                  are no penalties for early repayment of the loan.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="w-[800px]">
                <AccordionTrigger>
                  Can the terms of my consumer loan agreement be changed?
                </AccordionTrigger>
                <AccordionContent>
                  The consumer loan agreement may be amended or terminated by
                  mutual agreement of the parties or in cases expressly provided
                  for by law. Any amendments or termination of the agreement
                  shall be made in the form of additional agreements to the
                  consumer loan agreement.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="w-[800px]">
                <AccordionTrigger>
                  Do I have to purchase additional products or services from the
                  bank when taking a loan?
                </AccordionTrigger>
                <AccordionContent>
                  No, the bank is prohibited from requiring you to purchase any
                  goods or services from the bank or a related or affiliated
                  person as a mandatory condition for providing the loan
                  service, except for the provision of a package of banking
                  services.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="w-[800px]">
                <AccordionTrigger>
                  What happens if I fail to meet my obligations under the loan
                  agreement?
                </AccordionTrigger>
                <AccordionContent>
                  If you fail to meet your obligations under the agreement, the
                  bank has the right to demand compensation for damages in the
                  form of a penalty (fine) in accordance with the terms of the
                  agreement and current legislation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="w-[800px]">
                <AccordionTrigger>
                  Can the bank unilaterally change the terms of my agreement?
                </AccordionTrigger>
                <AccordionContent>
                  The bank is not entitled to make changes to agreements
                  concluded with customers unilaterally, unless otherwise
                  provided for by the agreement or the law.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
