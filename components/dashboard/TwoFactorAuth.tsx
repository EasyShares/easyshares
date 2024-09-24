"use client";
import React, { useEffect, useState, useRef, useTransition } from "react";
import { toast } from "sonner";
import { ExtendedUser } from "@/next-auth";
import { TwoFaSettings } from "@/actions/account";
import { ScaleLoader } from "react-spinners";

interface UserInfoProps {
  user?: ExtendedUser;
}

const TwoFactorAuth = ({ user }: UserInfoProps) => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    two_fa: user?.two_fa,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(
    formData.two_fa === user?.two_fa
  );
  const [twoFaCode, setTwoFaCode] = useState("");
  const [twoFaQRCode, setTwoFaQRCode] = useState("");

  useEffect(() => {
    setTwoFaCode(user?.two_fa_Code);
    setTwoFaQRCode(user?.two_fa_QRCode);
  }, [user?.two_fa_Code, user?.two_fa_QRCode]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCheckInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    const { id, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: checked ? "on" : "off",
    }));
  };

  const handleTwoFa = () => {
    if (!isChecked) {
      handleEnableTwoFa();
    }
    setIsOpen(true);
  };

  const handleEnableTwoFa = () => {
    if (isChecked) {
      setFormData((prevData) => ({
        ...prevData,
        two_fa: "on",
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        two_fa: "off",
      }));
    }

    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Invalid params!");
      return;
    }

    if (formData.two_fa !== "on" && formData.two_fa !== "off") {
      toast.error("Invalid params!");
      return;
    }

    // Save
    startTransition(() => {
      TwoFaSettings(formData)
        .then((data: any) => {
          const success = data.success;
          const message = data.message;
          if (success) {
            toast.success(`${message}`);
          } else {
            toast.error(`${message}`);
          }
          closeModal();
        })
        .catch((error) => {
          toast.error("An error occurred, try again!");
        });
    });
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Two-Factor Authentication
        </h2>
        <p className="text-gray-700 dark:text-white mb-4">
          Add an extra layer of security to your account with two-factor
          authentication (2FA).
        </p>
        <div className="flex items-center mt-4">
          <input
            disabled={isPending}
            onChange={handleCheckInput}
            type="checkbox"
            id="two_fa"
            className="mr-2"
            checked={formData.two_fa === "on"}
          />
          <label
            htmlFor="two_fa"
            className="text-gray-700 dark:text-white font-medium"
          >
            Enable Two-Factor Authentication
          </label>
        </div>
        <div className="mt-6">
          <button
            disabled={isPending}
            onClick={handleTwoFa}
            type="button"
            className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300 ease-in-out ${
              isPending
                ? "bg-blue-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
            }`}
          >
            {isPending ? (
              <span className="flex justify-center items-center bg-blue-600">
                <ScaleLoader
                  color="white"
                  loading={true}
                  height={20}
                  width={2}
                />
                <span className="ml-2">
                  Updating Two-Factor Authentication Settings...
                </span>
              </span>
            ) : (
              "Save Two-Factor Authentication Settings"
            )}
          </button>
        </div>
        {isOpen && isChecked && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white p-6 rounded-lg shadow-lg m-5">
              <h3 className="font-bold text-lg text-center mb-4 flex justify-center items-center flex-col">
                To enable Two-Factor Authentication Settings on your Phone.
                <p className="mt-3 text-sm font-semibold">
                  Download Google Authenticator App from Playstore, on any other
                  Authenticator App of your choice and Scan this QR Code or use
                  this Secret Key provided.
                </p>
                <p className="mt-3">
                  SECRET KEY:{" "}
                  <span className="text-blue-500"> {twoFaCode}</span>
                </p>
                <p className="mt-3">SCAN QR CODE</p>
                <div className="m-5">
                  <img src={twoFaQRCode} alt="QR Code" />
                </div>
              </h3>

              <div className="flex justify-between">
                <button
                  disabled={isPending}
                  onClick={handleEnableTwoFa}
                  type="button"
                  className={`bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300 ease-in-out ${
                    isPending
                      ? "bg-green-600 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300"
                  }`}
                >
                  {isPending ? (
                    <span className="flex justify-center items-center bg-green-600">
                      <ScaleLoader
                        color="white"
                        loading={true}
                        height={20}
                        width={2}
                      />
                      <span className="ml-2">
                        Enabling Two-Factor Authentication...
                      </span>
                    </span>
                  ) : (
                    "Enable"
                  )}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TwoFactorAuth;
