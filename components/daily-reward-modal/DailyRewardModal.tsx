import { AwesomeModalActions } from "@/components/awesome-modal/AwesomeModalActions";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Modal, ModalBackdrop, ModalContent } from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { PriceTag } from "@/components/utils/PriceTag";
import { DAILY_COINS_REWARDS } from "@/constants/dailyRewards";
import { sounds } from "@/constants/sounds";
import { useCurrencies } from "@/hooks/useCurrencies";
import { useStorageState } from "@/hooks/useStorageState";
import { fontWeightStyles } from "@/styles/commonStyles";
import { daysDifference, isSameDate } from "@/utils/dateUtils";
import { playSound } from "@/utils/soundPlayer";
import { StorageKey } from "@/utils/storage";
import { Check } from "lucide-react-native";
import React, { useEffect, useState } from "react";

export const DailyRewardModal = ({}: {}) => {
	const [visible, setVisible] = useState(false);

	const { incCoins } = useCurrencies();

	const [streak, setStreak] = useStorageState(
		StorageKey.rewardStreak,
		String(0)
	);
	const [lastRewardDate, setLastRewardDate] = useStorageState(
		StorageKey.lastRewardDate,
		String(new Date(0)) // 1.1.1970 (so on first login it will show the modal)
	);

	const [seenOnboarding] = useStorageState(
		StorageKey.seenOnboarding,
		String(0)
	);

	useEffect(() => {
		if (lastRewardDate && +seenOnboarding) {
			const now = new Date();
			const lastReward = new Date(lastRewardDate);

			// if missed a day, reset streak
			if (daysDifference(now, lastReward) > 1) setStreak(String(0));

			// if the user didn't claim the daily reward yet, show modal
			if (!isSameDate(now, lastReward)) setVisible(true);
		}
	}, [lastRewardDate, seenOnboarding]);

	if (!streak || !lastRewardDate) return null;

	return (
		<Modal isOpen={visible}>
			<ModalBackdrop />
			<ModalContent
				className="relative overflow-visible bg-background-card p-2 rounded-xl"
				style={{ borderWidth: 0 }}
			>
				<Text
					size="2xl"
					className="text-center"
					style={fontWeightStyles.black}
				>
					Welcome Back!
				</Text>
				<VStack className="w-full items-center" space="lg">
					<VStack>
						<Text
							className="text-center"
							style={fontWeightStyles.medium}
						>
							Come back every day to claim your daily reward.
						</Text>
						<Text
							className="text-center"
							style={fontWeightStyles.medium}
						>
							Complete a full week and earn 100 coins!
						</Text>
					</VStack>
					<HStack className="divide-x">
						{DAILY_COINS_REWARDS.map((amount, index) => {
							const prev = +streak > index;
							const current = +streak === index;
							return (
								<Center
									key={index}
									style={{}}
									className={
										"p-2 px-4 min-w-16 border-typography-500 " +
										(current
											? "bg-[#ffe57f] rounded-xl"
											: "")
									}
								>
									{current ? (
										<PriceTag
											price={amount}
											currencySize={28}
											fontSize={28}
											space="sm"
											spinAnimation
											forceTailwindColor="text-[#f59e0b]"
										/>
									) : prev ? (
										<Icon as={Check} />
									) : (
										<Text
											style={fontWeightStyles.medium}
											size={"3xl"}
										>
											{amount}
										</Text>
									)}
								</Center>
							);
						})}
					</HStack>
					<AwesomeModalActions
						color="#ffb109"
						buttonText="Claim"
						onResolve={() => {
							setVisible(false);
							playSound(sounds.win);
							incCoins(DAILY_COINS_REWARDS[+streak]);
							setLastRewardDate(String(new Date()));
							setStreak(
								String(
									(+streak + 1) % DAILY_COINS_REWARDS.length
								)
							);
						}}
					/>
				</VStack>
			</ModalContent>
		</Modal>
	);
};
