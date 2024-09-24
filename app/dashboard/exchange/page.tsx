import React from "react";
import DashBoardNav from "@/components/DashBoardNav";
import DashBoardFooter from "@/components/DashBoardFooter";
import BuySellShares from "@/components/dashboard/BuySellShares";
import { Metadata } from "next";
import PopularSharesTab from "@/components/dashboard/PopularSharesTab";
import { currentUser } from "@/lib/auth";
import {
  getBuyPrices,
  getPopularSharesBought,
  getPopularSharesSold,
  getSellrices,
} from "@/data/transaction";
import MatchingLive from "@/components/dashboard/MatchingLive";

export const metadata: Metadata = {
  title: {
    absolute: "Buy and Sell Shares Seamlessly with EasyShares",
  },
  description:
    "Revolutionize share trading with EasyShares. Buy low, sell high with our innovative Rate of Investment (ROI) system. Set your custom ROI between 20% to 50% and watch your investments grow. Our automated platform ensures seamless matching of buyers and sellers, guaranteeing quick transactions.",
};

const Exchange = async () => {
  const user = await currentUser();
  const popularBuyShares = await getPopularSharesBought();
  const popularSellShares = await getPopularSharesSold();
  const buyPrices = await getBuyPrices();
  const sellPrices = await getSellrices();
  return (
    <>
      <div className=" bg-gray-50 dark:bg-gray-900 min-h-screen">
        <DashBoardNav user={user} />
        {/* Buy and Sell Shares Container */}
        <BuySellShares
          sellPrices={sellPrices}
          buyPrices={buyPrices}
        ></BuySellShares>

        {/* Live Action */}
        <MatchingLive></MatchingLive>

        {/* Popular Shares */}
        <PopularSharesTab
          popularBuyShares={popularBuyShares}
          popularSellShares={popularSellShares}
        ></PopularSharesTab>

        <DashBoardFooter />
      </div>
    </>
  );
};

export default Exchange;
