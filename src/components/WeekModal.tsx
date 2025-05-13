import React from "react";
import { IWeek } from "../../types/week";
import CurrentWeekFlatList from "./CurrentWeekFlatList";
import ModalTemplate from "./ModalTemplate";

interface IWeekModal extends IWeek {
  hideModal: () => void;
  modalVisible: boolean;
}

export default function WeekModal({
  id,
  notes,
  start_date,
  end_date,
  hideModal,
  modalVisible,
}: IWeekModal) {
  return (
    <>
      <ModalTemplate hideModal={hideModal} modalVisible={modalVisible}>
        <CurrentWeekFlatList notes={notes} />
      </ModalTemplate>
    </>
  );
}
