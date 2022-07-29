import { NextPage } from "next";
import { toast } from "react-toastify";

import {
  EyeIcon,
  EyeOffIcon,
  DuplicateIcon,
  CheckIcon,
  TrashIcon,
  RefreshIcon,
  LockClosedIcon,
  LockOpenIcon,
  CheckCircleIcon,
  ClipboardCopyIcon,
  ClipboardCheckIcon,
  CogIcon,
} from "@heroicons/react/outline";
import { debounce, isEqual } from "lodash";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Spinner from "@components/Spinner";
import { useTokens, useToken } from "@utils/swr/hooks";
import { useSWRConfig } from "swr";
import { RadioGroup } from "@headlessui/react";
import { ComputePosition, inline } from "@floating-ui/core";
import Tooltip from "@components/Tooltip";

const Tokens: NextPage = (props) => {
  const { mutate } = useSWRConfig();
  const [showKeys, setShowKeys] = useState(false);
  const [copiedId, setCopiedId] = useState("");
  const [spin, setSpin] = useState(false);
  const [creatingToken, setCreatingToken] = useState(false);
  const { tokens, isLoading, isError, update } = useTokens(props.idToken);
  const [selected, setSelected] = useState();
  const { token, isTokenLoading, isTokenError } = useToken(
    props.idToken,
    selected
  );
  useEffect(() => {
    let timer1 = setTimeout(() => setCopiedId(""), 6000);
    return () => {
      clearTimeout(timer1);
    };
  }, [copiedId]);

  const updateToken = async (key, options) => {
    await fetch(`/api/user/tokens/${key}`, {
      headers: {
        Authorization: `Bearer ${props.idToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(options),
    })
      .then(async (res) => {
        if (res.ok) return res.json();
        else throw await res.json();
      })
      .then((data) => {
        mutate(["/api/user/tokens", props.idToken]);
        mutate([`/api/user/tokens/${key}`, props.idToken]);
        toast(
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="h-6 w-6 text-blue-500" />
            <span>
              <h1 className=" font-medium">Success</h1>
              <p className="text-sm font-extralight">{data.message}</p>
            </span>
          </div>,
          {
            theme: "dark",
            progressClassName: "toastProgressBlue",
          }
        );
      })
      .catch((e) =>
        toast(
          <div className="flex items-center space-x-3">
            <span>
              <h1 className=" font-medium">Failed</h1>
              <p className="text-sm font-extralight">{e.message}</p>
            </span>
          </div>,
          {
            type: "error",
          }
        )
      );
  };

  const deleteToken = async (key: string, name: string) => {
    await fetch(`/api/user/tokens/${key}`, {
      headers: {
        Authorization: `Bearer ${props.idToken}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then(async (res) => {
        if (res.ok) return res.json();
        else throw await res.json();
      })
      .then((data) => {
        const newData = tokens.keys.filter((token) => {
          return token.key !== key;
        });

        update({ ...{ keys: newData } });
        mutate([`/api/user/tokens/${key}`, props.idToken]);
        toast(
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="h-6 w-6 text-blue-500" />
            <span>
              <h1 className=" font-medium">Success</h1>
              <p className="text-sm font-extralight">
                {name} has been deleted.
              </p>
            </span>
          </div>,
          {
            theme: "dark",
            progressClassName: "toastProgressBlue",
          }
        );
      })
      .catch((e) => console.log("error, ", e));
  };
  const createToken = async () => {
    setCreatingToken(true);
    const result = await fetch("/api/user/tokens", {
      headers: { Authorization: `Bearer ${props.idToken}` },
      method: "POST",
    })
      .then(async (res) => {
        if (res.ok) return res.json();
        else throw await res.json();
      })
      .then((data) => {
        toast(
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="h-6 w-6 text-blue-500" />
            <span>
              <h1 className=" font-medium">Success</h1>
              <p className="text-sm font-extralight">{data.message}</p>
            </span>
          </div>,
          {
            theme: "dark",
            progressClassName: "toastProgressBlue",
          }
        );
        let newKey = data.key;
        update({ ...tokens, newKey });
        return data;
      })
      .catch((e) =>
        toast(
          <div className="flex items-center space-x-3">
            <span>
              <h1 className=" font-medium">{e.error}</h1>
              <p className="text-sm font-extralight">{e.message}</p>
            </span>
          </div>,
          {
            type: "error",
          }
        )
      );
    setCreatingToken(false);
    return result;
  };

  return (
    <div className="flex flex-col items-start  p-5">
      <div className="pb-5 dark:pb-0 border-b border-gray-200 dark:border-zinc-700 dark:border-none sm:flex sm:items-center sm:justify-between w-full">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-zinc-100">
          API Keys
        </h3>
        <div className="mt-3 flex sm:mt-0 sm:ml-4 space-x-3">
          <button
            disabled={spin}
            type="button"
            onAnimationEnd={() => setSpin(false)}
            onClick={() => {
              setSpin(true);
              mutate(["/api/user/tokens", props.idToken]);
            }}
            className="inline-flex items-center p-2 border border-gray-300 dark:border-zinc-800 dark:bg-black rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring-offset-zinc-800 "
          >
            <RefreshIcon
              className={clsx(
                "h-6 text-gray-400 dark:text-zinc-300 ",
                spin && "animate-spin-slow"
              )}
            />
          </button>
          <button
            type="button"
            onClick={() => setShowKeys(!showKeys)}
            className="inline-flex items-center p-2 border border-gray-300 dark:border-zinc-800 dark:bg-black rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring-offset-zinc-800"
          >
            {showKeys ? (
              <EyeIcon className="h-6 text-gray-400 dark:text-zinc-300" />
            ) : (
              <EyeOffIcon className="h-6 text-gray-400 dark:text-zinc-300" />
            )}
          </button>
          <button
            disabled={creatingToken}
            onClick={() => createToken()}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring-offset-black"
          >
            Create Token
          </button>
        </div>
      </div>

      {isLoading && (
        // <Spinner color="blue" />
        <div className="flex flex-col space-y-5 ">
          {Array.from(Array(5).keys()).map(() => {
            return (
              <div className="flex flex-col space-y-3 max-w-md w-full">
                <span className=" w-1/4 h-3 dark:bg-zinc-800  rounded-lg animate-pulse"></span>
                <div className="h-14 w-[416px] rounded-lg flex items-center justify-between p-5 overflow-hidden relative bg-white dark:bg-black border shadow-lg dark:shadow-none shadow-gray-100  border-gray-200 dark:border-zinc-900 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent">
                  <span className=" w-3/4 h-3 bg-zinc-800 rounded-lg "></span>
                  <DuplicateIcon className="h-6 text-gray-600 hover:text-blue-500 transition-colors " />
                </div>
              </div>
            );
          })}
        </div>
      )}
      {isError && <div>Error: {isError.message}</div>}

      {tokens && (
        <div className="w-full grid grid-cols-2 gap-5">
         
            <div className="flex flex-col max-w-xl space-y-2 ">
              {tokens.keys.map((item, index) => (
                <div className={clsx("space-y-1 transition-all", selected && item.key !== selected && "opacity-40")}>
                  <p className="font-medium dark:text-zinc-200">{item.name}</p>

                  <div className={"flex space-x-2"}>
                    <div className={clsx("w-full relative")}>
                      <input
                      onClick={() => setSelected(item.key)}
                        value={item.key}
                        readOnly
                        name="password"
                        id="password"
                        spellCheck={false}
                        type={showKeys ? "text" : "password"}
                        className={clsx(
                          "form-input pr-10 pl-4 py-4 w-full font-medium rounded-lg focus:outline-none bg-black text-gray-400 border-zinc-900 border-2 hover:outline-blue-500 hover:outline-1 hover:outline  transition-colors cursor-pointer"
                        )}
                      ></input>
                      <div className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(item.key);
                            toast(
                              <div className="flex items-center space-x-3">
                                <ClipboardCheckIcon className="h-6 w-6 text-blue-500" />
                                <span>
                                  <p className="text-sm font-extralight">
                                    {item.name} copied to clipboard.
                                  </p>
                                </span>
                              </div>,
                              {
                                theme: "dark",
                                progressClassName: "toastProgressBlue",
                              }
                            );
                            setCopiedId(index);
                          }}
                        >
                          {copiedId === index ? (
                            <CheckIcon className="h-6 text-blue-500" />
                          ) : (
                            <DuplicateIcon className="h-6 text-gray-400 dark:text-zinc-300 hover:text-blue-500 transition-colors" />
                          )}
                        </button>
                      </div>
                    </div>
                    <button onClick={() => setSelected(item.key)}>
                      <CogIcon className="h-6 text-gray-400 dark:text-zinc-300" />
                    </button>
                  </div>
                </div>
              ))}
            
          </div>
          {isTokenLoading && <Spinner className="h-5 w-5" />}
          {isTokenError && <div>Error: {isError.message}</div>}
          {token?.key && (
            <div className="max-w-xl">
              <TokenPage
                updateToken={updateToken}
                token={token.key}
                deleteToken={deleteToken}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const settings = [
  {
    id: "unlimited",
    name: "Unlimited",
    description: "Token will have unlimited quota",
  },
  {
    id: "limited",
    name: "Limited",
    description: "Token will be limited to token specific quota",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function TokenPage({ token, updateToken, deleteToken }) {
  const [selected, setSelected] = useState(settings[0]);
  const [tokenOptions, setTokenOptions] = useState(token);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const eventHandler = (key, value) => {
    setTokenOptions((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  useEffect(() => {
    setTokenOptions(token);
  }, [token]);
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-medium text-white text-lg ">Name</h1>
        <input
          value={tokenOptions.name}
          onChange={(e) => eventHandler("name", e.target.value)}
          name="token-name"
          id="token-name"
          spellCheck={false}
          type="text"
          className="form-input pr-10 pl-4 py-4 w-full font-medium rounded-lg focus:outline-none bg-black text-gray-400 border-zinc-900 border-2 hover:outline-blue-500 hover:outline-1 hover:outline transition-colors cursor-pointer"
        />
      </div>
      <div className="space-y-3">
        <div className="">
          <h1 className="font-medium text-white text-lg ">Usage metrics</h1>
          <p className="text-zinc-400 ">Usage resets on Aug 1, 2022</p>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <h1 className="text-white font-medium ">Requests</h1>
            <p className="text-zinc-400 font-medium">
              <span className="text-zinc-200">{token.usage}</span> /{" "}
              {token.quota_limit === "unlimited" ? <>&infin;</> : token.quota}
            </p>
          </div>
          {token.quota_limit === "limited" && (
            <div className="h-3 w-full bg-zinc-900 rounded-full relative">
              <span
                style={{
                  width:
                    token.usage > token.quota
                      ? "100%"
                      : (token.usage / token.quota) * 100 + "%",
                }}
                className={`absolute h-3 bg-blue-600 rounded-full`}
              ></span>
            </div>
          )}
        </div>
      </div>
      <div className=" space-y-3">
        <div className="">
          <h1 className="font-medium text-white text-lg ">Quota limit</h1>
          <p className="text-zinc-400 ">
            Define whether this token would be quota limited
          </p>
        </div>
        <RadioGroup
          value={tokenOptions.quota_limit}
          onChange={(item) => eventHandler("quota_limit", item)}
        >
          <RadioGroup.Label className="sr-only">
            Privacy setting
          </RadioGroup.Label>
          <div className="bg-white dark:bg-black rounded-md -space-y-px">
            {settings.map((setting, settingIdx) => (
              <RadioGroup.Option
                key={setting.name}
                value={setting.id}
                className={({ checked }) =>
                  classNames(
                    settingIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
                    settingIdx === settings.length - 1
                      ? "rounded-bl-md rounded-br-md"
                      : "",
                    checked
                      ? "bg-blue-50 border-blue-200 dark:border-blue-900 dark:bg-blue-900 z-10"
                      : "border-gray-200 dark:border-zinc-900",
                    "relative border p-4 flex cursor-pointer focus:outline-none dark:bg-opacity-30"
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span
                      className={classNames(
                        checked
                          ? "bg-blue-600 border-transparent"
                          : "bg-white border-gray-300 dark:bg-black dark:border-zinc-800",
                        active
                          ? "ring-2 ring-offset-2 ring-blue-600 dark:ring-offset-black"
                          : "",
                        "h-4 w-4 mt-0.5 cursor-pointer shrink-0 rounded-full border flex items-center justify-center"
                      )}
                      aria-hidden="true"
                    >
                      <span className="rounded-full bg-white dark:bg-black w-1.5 h-1.5" />
                    </span>
                    <span className="ml-3 flex justify-between space-x-4 w-full">
                      <RadioGroup.Label
                        as="span"
                        className={classNames(
                          checked
                            ? "text-blue-900 dark:text-blue-500"
                            : "text-gray-900 dark:text-zinc-300",
                          "block text-sm font-medium"
                        )}
                      >
                        {setting.name}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="span"
                        className={classNames(
                          checked
                            ? "text-blue-700 dark:text-blue-500"
                            : "text-gray-500 dark:text-zinc-400",
                          "block text-sm"
                        )}
                      >
                        {setting.description}
                      </RadioGroup.Description>
                    </span>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        {tokenOptions.quota_limit === "limited" && (
          <div className="flex items-center space-x-3">
            <div className="relative pt-1 flex-1">
              <label className=" font-medium text-zinc-200">Limit</label>
              <input
                value={tokenOptions.quota}
                min={token.usage}
                step={25}
                max={1000}
                onChange={(e) =>
                  eventHandler("quota", parseInt(e.target.value))
                }
                type="range"
                className="appearance-none w-full h-3 p-0 focus:outline-none focus:ring-0 focus:shadow-none bg-zinc-900 rounded-full slider"
                id="customRange1"
              />
            </div>
            <input
              value={tokenOptions.quota}
              min={token.usage}
              max={1000}
              onChange={(e) => eventHandler("quota", parseInt(e.target.value))}
              step={25}
              type="number"
              className="form-input max-w-[80px] font-medium rounded-lg focus:outline-none bg-black text-gray-400 border-zinc-900 border-2 hover:outline-blue-500 hover:outline-1 hover:outline transition-colors cursor-pointer"
            />
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={() => eventHandler("locked", !tokenOptions.locked)}
            type="button"
            className={clsx(
              tokenOptions.locked
                ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
              "inline-flex items-center p-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black"
            )}
          >
            {tokenOptions.locked ? (
              <LockClosedIcon className="h-5 w-5" />
            ) : (
              <LockOpenIcon className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={() => {
              setDeleteLoading(true);
              deleteToken(token.key, token.name).then(() =>
                setDeleteLoading(false)
              );
            }}
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:ring-offset-black"
          >
            {deleteLoading ? <Spinner className="h-5 w-5" /> : "Revoke Token"}
          </button>
        </div>
        {!isEqual(token, tokenOptions) && token.key === tokenOptions.key && (
          <div className="flex items-end space-x-5">
            <p className="text-zinc-400">You have unsaved changes.</p>
            <button
              onClick={() => {
                const allowed = ["locked", "name", "quota", "quota_limit"];
                const filtered = Object.keys(tokenOptions)
                  .filter((key) => allowed.includes(key))
                  .reduce((obj, key) => {
                    return {
                      ...obj,
                      [key]: tokenOptions[key],
                    };
                  }, {});
                setUpdateLoading(true);
                updateToken(token.key, filtered).then(() =>
                  setUpdateLoading(false)
                );
              }}
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring-offset-black"
            >
              {updateLoading ? <Spinner className="h-5 w-5" /> : "Save"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tokens;
