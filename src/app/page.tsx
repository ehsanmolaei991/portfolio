import {
  BookOpenCheck,
  Brain,
  BriefcaseBusiness,
  CalendarDays,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  SquareArrowOutUpRight,
} from "lucide-react";
import data from "@data/data_en.json";
// import deutsch from "@data/deutsch.json";
import english from "@data/english.json";
import classNames from "classnames";
import Highlighter from "react-highlight-words";
import { useState } from "react";

const currentLang = "en";
const lang = english;

export default function App() {
  // const [lang, setLang] = useState(deutsch);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {/* Main Info */}
      {/* <div className="page relative overflow-hidden">
        <span className="shape block absolute top-0 right-0 size-full bg-gray-500/5" />
        <div className="flex h-full w-full justify-center">
          <div className="flex flex-col items-center h-full justify-between py-20">
            <section className="space-y-4">
              <h1 className="uppercase text-slate-700 font-bold text-center text-5xl">
                {data?.firstName} {data?.lastName}
              </h1>
              <h2 className="uppercase text-slate-500 text-center text-3xl">
                {lang?.applicationAs}{" "}
                <span className="text-slate-700">{data?.applicationAs}</span>
              </h2>
            </section>

            <section>
              <img
                src={data?.imagesSrc}
                alt="Ehsan Molaei"
                className="size-80 z-20 rounded-full border-[1rem] border-slate-700"
              />
            </section>

            <section className="flex justify-between w-full mt-20 px-14">
              <div>
                <h3 className="text-xl font-bold text-slate-700">
                  {lang?.contact}:
                </h3>
                <h5 className="mt-1 text-md font-semibold text-slate-500">
                  {data?.city}, {data?.country}
                </h5>

                <ul className="mt-6 space-y-1">
                  {data?.contacts?.map((item) => (
                    <li key={item?.title}>
                      <span className="font-medium text-base text-slate-500">
                        {item?.title}:{" "}
                      </span>
                      <a
                        href={item?.link}
                        className="font-semibold text-slate-600 hover:text-slate-900"
                      >
                        {item?.value}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-700">
                  {lang?.hierarchy}:
                </h3>

                <ul className="mt-1 list-disc ml-3">
                  <li className="text-md font-semibold text-slate-500">
                    <a href="#Anschreiben">{lang?.cover_letter}</a>
                  </li>
                  <li className="text-md font-semibold text-slate-500">
                    <a href="#Lebenslauf">{lang?.cv}</a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div> */}

      {/* Anschreiben */}
      {/* <div id="Anschreiben" className="page relative overflow-hidden">
        <span className="block absolute top-0 right-0 w-0 h-0 border-[200px] border-t-0 border-l-0 border-transparent border-r-gray-500/5" />
        <div className="flex flex-col h-full gap-10">
          <div className="flex justify-between w-full">
            <div>
              <h3 className="text-3xl font-semibold text-slate-600/10 mb-7">
                {lang?.cover_letter}
              </h3>
              <h3 className="text-lg font-bold text-slate-700">
                {data?.companyName}
              </h3>
              <h5 className="mt-1 text-sm font-semibold text-slate-500">
                {data?.companyLocation}
              </h5>
            </div>
            <div className="-mt-6">
              <h3 className="text-lg font-bold text-slate-700">
                {data?.firstName} {data?.lastName}
              </h3>
              <h5 className="mt-1 text-sm font-semibold text-slate-500">
                {data?.city}, {data?.country}
              </h5>

              <ul className="mt-6 space-y-1">
                {data?.contacts?.map((item) => (
                  <li key={item?.title}>
                    <span className="font-medium text-sm text-slate-500">
                      {item?.title}:{" "}
                    </span>
                    <a
                      href={item?.link}
                      className="font-semibold text-sm text-slate-600 hover:text-slate-900"
                    >
                      {item?.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <span className="text-right text-sm text-slate-800">
            {data?.currentData}
          </span>
          <div className="space-y-3 divide-y-2">
            <h1 className="uppercase text-slate-700 font-semibold text-xl">
              {lang?.applicationAs} {data?.applicationAs}
            </h1>
            <p className="leading-6 pt-3 text-md space-y-4 *:block">
              <span>Sehr geehrte Damen und Herren,</span>
              <span>
                suchen Sie einen kompetenten, motivierten Projektmanager mit
                Erfahrung in der Leitung und Durchführung anspruchsvoller und
                komplexer Projekte? Sie suchen nach einem Mitarbeiter, der
                Problemen nicht aus dem Weg geht, sondern sie löst? Dann ist
                meine Bewerbung sicher von Interesse für Sie.
              </span>
              <span>
                Durch meine Ausbildung und auch während meines Studiums an der
                Universität Musterstadt sammelte ich Erfahrung durch diverse
                Praktika. Nach dem sehr erfolgreichen Abschluss als Bürokaufmann
                stieg ich bei der Erste Beispiel GmbH als Junior Projektmanager
                ein (...)
              </span>
              <span>
                Gerne möchte ich meine persönlichen Fähigkeiten und Erfahrungen
                in Ihr Unternehmen einbringen. Meine Gehaltsvorstellungen liegen
                bei 60.000 € im Jahr und ich stehe Ihnen ab sofort zur
                Verfügung.
              </span>
              <span>
                Ich freue mich sehr auf ein persönliches Vorstellungsgespräch.
              </span>
              <span>Mit freundlichen Grüßen</span>

              <span>
                {data?.firstName} {data?.lastName}
              </span>
            </p>
          </div>
        </div>
      </div> */}

      {/* Lebenslauf - (Experiences) */}
      <div id="Lebenslauf" className="page relative overflow-hidden">
        <span className="block triangle absolute top-0 right-0 size-full bg-gray-500/5" />
        <div className="flex flex-col h-full gap-10">
          <div className="flex justify-between w-full">
            <div>
              <h3 className="text-3xl font-semibold text-slate-500">
                {lang?.cv}
              </h3>
              <h5 className="mt-1 text-5xl font-bold text-slate-700">
                {data?.firstName} {data?.lastName}
              </h5>

              <ul className="space-y-1 mt-6">
                {/* Birthday */}
                <li className="grid grid-cols-2 text-slate-600">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="size-4" />
                    <span>{lang?.birthday}</span>
                  </span>
                  <span>
                    {data?.birthday} in {data?.bornIn}
                  </span>
                </li>
                {/* Address */}
                <li className="grid grid-cols-2 text-slate-600">
                  <span className="flex items-center gap-1">
                    <MapPin className="size-4" />
                    <span>{lang?.address}</span>
                  </span>
                  <span>
                    {data?.city}, {data?.country}
                  </span>
                </li>
                {/* Tell */}
                {!!data?.contacts?.find((e) => e.id === "MOBILE") && (
                  <li className="grid grid-cols-2 text-slate-600">
                    <span className="flex items-center gap-1">
                      <Phone className="size-4" />
                      <span>
                        {data?.contacts?.find((e) => e.id === "MOBILE")?.title}
                      </span>
                    </span>
                    <a
                      href={
                        data?.contacts?.find((e) => e.id === "MOBILE")?.link
                      }
                    >
                      {data?.contacts?.find((e) => e.id === "MOBILE")?.value}
                    </a>
                  </li>
                )}
                {/* Mail */}
                {!!data?.contacts?.find((e) => e.id === "MAIL") && (
                  <li className="grid grid-cols-2 text-slate-600">
                    <span className="flex items-center gap-1">
                      <Mail className="size-4" />
                      <span>
                        {data?.contacts?.find((e) => e.id === "MAIL")?.title}
                      </span>
                    </span>
                    <a
                      href={data?.contacts?.find((e) => e.id === "MAIL")?.link}
                    >
                      {data?.contacts?.find((e) => e.id === "MAIL")?.value}
                    </a>
                  </li>
                )}
                {/* GITHUB */}
                {!!data?.contacts?.find((e) => e.id === "GITHUB") && (
                  <li className="grid grid-cols-2 text-slate-600">
                    <span className="flex items-center gap-1">
                      <Github className="size-4" />
                      <span>
                        {data?.contacts?.find((e) => e.id === "GITHUB")?.title}
                      </span>
                    </span>
                    <a
                      href={
                        data?.contacts?.find((e) => e.id === "GITHUB")?.link
                      }
                    >
                      {data?.contacts?.find((e) => e.id === "GITHUB")?.value}
                    </a>
                  </li>
                )}
                {/* LINKEDIN */}
                {!!data?.contacts?.find((e) => e.id === "LINKEDIN") && (
                  <li className="grid grid-cols-2 text-slate-600">
                    <span className="flex items-center gap-1">
                      <Linkedin className="size-4" />
                      <span>
                        {
                          data?.contacts?.find((e) => e.id === "LINKEDIN")
                            ?.title
                        }
                      </span>
                    </span>
                    <a
                      href={
                        data?.contacts?.find((e) => e.id === "LINKEDIN")?.link
                      }
                    >
                      {data?.contacts?.find((e) => e.id === "LINKEDIN")?.value}
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div className="-mt-6">
              <img
                src={data?.imagesSrc}
                alt="Ehsan Molaei"
                className="size-56 z-20 rounded-full border-[1rem] border-slate-700"
              />
            </div>
          </div>
          <section className="space-y-3">
            <div className="flex gap-4 border-b-2 border-slate-200 pb-2">
              <div className="size-8 flex justify-center items-center bg-slate-700 rounded-full">
                <BriefcaseBusiness className="text-white size-5" />
              </div>
              <h1 className="font-bold text-xl text-slate-700">
                {lang?.experience}
              </h1>
            </div>

            <ul className="space-y-6">
              {data?.experiences?.slice(0, 3)?.map((item, i) => (
                <li
                  key={`experiences-${item?.company?.name}-${i}`}
                  className="grid grid-cols-4"
                >
                  <span className="col-span-1 pt-1 text-sm text-slate-600">
                    {!item?.endDate
                      ? `Seit ${item?.startDate} `
                      : `${item?.startDate} - ${item?.endDate}`}
                  </span>
                  <div className="col-span-3">
                    <h2
                      className={classNames("font-black w-fit text-slate-600", {
                        "underline hover:text-slate-800": !!item?.company?.href,
                      })}
                    >
                      {!!item?.company?.href ? (
                        <a
                          className="flex gap-1 items-center"
                          href={item?.company?.href || "#"}
                        >
                          {item?.company?.name}
                          <SquareArrowOutUpRight className="size-3" />
                        </a>
                      ) : (
                        item?.company?.name
                      )}
                    </h2>
                    <h3 className="text-slate-500 text-sm font-semibold">
                      {item?.position}
                    </h3>
                    <ul className="list-disc pl-3 mt-4 space-y-1">
                      {item?.achievements?.map((achieve, i) => (
                        <li
                          key={`achieve-${i}`}
                          className="text-xs font-light text-slate-800 leading-[18px]"
                        >
                          {/* @ts-ignore */}
                          <Highlighter
                            searchWords={(achieve?.options || [])
                              ?.map((e) => e.search)
                              .filter((e) => e)}
                            autoEscape={true}
                            textToHighlight={achieve?.value}
                            highlightTag={(word: any) => {
                              const option: any = achieve?.options?.find(
                                (e) => e?.search === word?.children
                              );

                              if (option?.type === "link")
                                return (
                                  <a
                                    className="underline font-bold text-slate-700 hover:text-slate-900"
                                    href={option?.href}
                                  >
                                    {option?.search}
                                  </a>
                                );

                              return (
                                <span className="font-bold text-slate-800">
                                  {option?.search}
                                </span>
                              );
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Lebenslauf - (Experiences, Skills) */}
      <div id="Lebenslauf" className="page relative overflow-hidden">
        <span className="block triangle-bottom absolute top-0 right-0 size-full bg-gray-500/5" />
        <div className="flex flex-col h-full gap-6">
          <section className="space-y-3">
            <div className="flex gap-4 border-b-2 border-slate-200 pb-2">
              <div className="size-8 flex justify-center items-center bg-slate-700 rounded-full">
                <BriefcaseBusiness className="text-white size-5" />
              </div>
              <h1 className="font-bold text-xl text-slate-700">
                {lang?.experience}
              </h1>
            </div>

            <ul className="space-y-6">
              {data?.experiences?.slice(3)?.map((item, i) => (
                <li
                  key={`experiences-${item?.company?.name}-${i}`}
                  className="grid grid-cols-4"
                >
                  <span className="col-span-1 pt-1 text-sm text-slate-600">
                    {!item?.endDate
                      ? `Seit ${item?.startDate} `
                      : `${item?.startDate} - ${item?.endDate}`}
                  </span>
                  <div className="col-span-3">
                    <h2
                      className={classNames("font-black w-fit text-slate-600", {
                        "underline hover:text-slate-800": !!item?.company?.href,
                      })}
                    >
                      {!!item?.company?.href ? (
                        <a
                          className="flex gap-1 items-center"
                          href={item?.company?.href || "#"}
                        >
                          {item?.company?.name}
                          <SquareArrowOutUpRight className="size-3" />
                        </a>
                      ) : (
                        item?.company?.name
                      )}
                    </h2>
                    <h3 className="text-slate-500 text-sm font-semibold">
                      {item?.position}
                    </h3>
                    <ul className="list-disc pl-3 mt-4 space-y-1">
                      {item?.achievements?.map((achieve, i) => (
                        <li
                          key={`achieve-${i}`}
                          className="text-xs font-light text-slate-800 leading-[18px]"
                        >
                          {/* @ts-ignore */}
                          <Highlighter
                            searchWords={(achieve?.options || [])
                              ?.map((e) => e.search)
                              .filter((e) => e)}
                            autoEscape={true}
                            textToHighlight={achieve?.value}
                            highlightTag={(word: any) => {
                              const option: any = achieve?.options?.find(
                                (e) => e?.search === word?.children
                              );

                              if (option?.type === "link")
                                return (
                                  <a
                                    className="underline font-bold text-slate-700 hover:text-slate-900"
                                    href={option?.href}
                                  >
                                    {option?.search}
                                  </a>
                                );

                              return (
                                <span className="font-bold text-slate-800">
                                  {option?.search}
                                </span>
                              );
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Skills */}
          <section className="space-y-3">
            <div className="flex gap-4 border-b-2 border-slate-200 pb-2">
              <div className="size-8 flex justify-center items-center bg-slate-700 rounded-full">
                <Brain className="text-white size-5" />
              </div>
              <h1 className="font-bold text-xl text-slate-700">
                {lang?.skills}
              </h1>
            </div>

            <div className="grid grid-cols-4">
              <div>
                <h3 className="font-semibold text-slate-600 mb-1">
                  {lang?.main}
                </h3>
                <ul className="list-disc pl-3 text-sm text-slate-500">
                  {(data?.skills?.main || [])?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-600 mb-1">
                  {lang?.frontend}
                </h3>
                <ul className="list-disc pl-3 text-sm text-slate-500">
                  {(data?.skills?.frontend || [])?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-600 mb-1">
                  {lang?.backend}
                </h3>
                <ul className="list-disc pl-3 text-sm text-slate-500">
                  {(data?.skills?.backend || [])?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-600 mb-1">
                  {lang?.general_skills}
                </h3>
                <ul className="list-disc pl-3 text-sm text-slate-500">
                  {(data?.skills?.general_skills || [])?.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Lebenslauf - (Education, Languages, Hobby) */}
      <div id="Lebenslauf" className="page relative overflow-hidden">
        <span className="block triangle-bottom absolute top-0 right-0 size-full bg-gray-500/5" />
        <div className="flex flex-col h-full gap-10">
          <section className="space-y-3">
            <div className="flex gap-4 border-b-2 border-slate-200 pb-2">
              <div className="size-8 flex justify-center items-center bg-slate-700 rounded-full">
                <GraduationCap className="text-white size-5" />
              </div>
              <h1 className="font-bold text-xl text-slate-700">
                {lang?.education}
              </h1>
            </div>

            <ul className="space-y-6">
              {data?.educations?.map((item, i) => (
                <li
                  key={`experiences-${item?.location}-${i}`}
                  className="grid grid-cols-4"
                >
                  <span className="col-span-1 pt-1 text-sm text-slate-600">
                    {!item?.endDate
                      ? `Seit ${item?.startDate} `
                      : `${item?.startDate} - ${item?.endDate}`}
                  </span>
                  <div className="col-span-3">
                    <h2 className={"font-black w-fit text-slate-600"}>
                      {item?.degree}
                    </h2>
                    <h3 className="text-slate-500 text-sm font-semibold">
                      {item?.location}
                    </h3>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Languages, Hobby */}
          <section className="space-y-3">
            <div className="flex gap-4 border-b-2 border-slate-200 pb-2">
              <div className="size-8 flex justify-center items-center bg-slate-700 rounded-full">
                <BookOpenCheck className="text-white size-5" />
              </div>
              <h1 className="font-bold text-xl text-slate-700">
                {lang?.knowledgeAndIntrest}
              </h1>
            </div>

            <ul className="space-y-6">
              {data?.knowledgeAndIntrest?.map((item, i) => (
                <li
                  key={`experiences-${item?.title}-${i}`}
                  className="grid grid-cols-4"
                >
                  <span className="col-span-1 pt-1 text-sm text-slate-600">
                    {item?.title}
                  </span>
                  <ul className="col-span-3">
                    {item?.list?.map((itemList) => (
                      <li key={item?.title} className="flex gap-6 items-center">
                        <h2 className={"font-bold w-fit text-slate-600"}>
                          {itemList?.title}
                        </h2>
                        {!!(itemList as any)?.level && (
                          <h3 className="text-slate-500 text-sm font-semibold">
                            {(itemList as any)?.level}
                          </h3>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Select Lang */}
      {/* <button
        onClick={() => {
          setCurrentLang(currentLang === "en" ? "de" : "en");
          setLang(currentLang === "en" ? deutsch : english);
        }}
        className="print:hidden border-slate-700 hover:bg-slate-700 hover:text-white rounded-full uppercase border p-4 aspect-square fixed bottom-4 left-4"
      >
        {currentLang}
      </button> */}
    </main>
  );
}
