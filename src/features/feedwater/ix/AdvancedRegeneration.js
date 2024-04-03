/* eslint-disable max-len */
import React, { useState } from "react";
import { Card, Form, Row, Table } from "react-bootstrap";
import SystemDiagram from "./SystemDiagram";
import AdvancedRegenerationStyled from "./AdvancedRegenerationStyled";
import StyledCard from "../../../common/styles/components/cards/CustomCard";
import CustomInput from "../../../common/styles/components/inputs/CustomInput";
import InputReferenceText from "../../../common/styles/components/headings/InputReferenceText";
import CustomLabel from "../../../common/styles/components/headings/CustomLabel";
import CustomHeading from "../../../common/styles/components/headings/CustomHeading";
import { colors } from "../../../common/styles/Theme";
import CustomRadioCheck from "../../../common/styles/components/checkboxs/CustomRadioCheck";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProjectErrorPopup from "../../modals/ProjectErrorPopup";

import {
  updateAdvAnion,
  updateAdvCation,
  updateAnionRegen,
  updateCationRegen,
} from "./IXDSlice";
import { IXDUtility } from "./IXDUtilityFunction";
import CustomRadio from "../../../common/styles/components/radios/CustomRadio";
import GlobalUnitConversion from "../../../common/utils/GlobalUnitConversion";
const AdvancedRegeneration = () => {
  const [autoFocusValue, setAutoFocusValue] = useState(false);

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const unit = useSelector(
    (state) => state.projectInfo?.projectConfig?.unitConfig
  );
  const ixStoreAdvance = useSelector(
    (state) => state.IXStore?.data?.listAdvRegen
  );
  const GlobalUnitConversionStore = useSelector(
    (state) => state.GUnitConversion.data
  );
  //Range
  const cationAdvRegen = useSelector(
    (state) => state.IXStore?.updateCationDataAdvRegen
  );
  const anionAdvRegen = useSelector(
    (state) => state.IXStore?.updateAnionDataAdvRegen
  );
  //Update
  const cationRegenData = useSelector(
    (state) => state.IXStore?.updateCationRegenData
  );
  const AnionRegenData = useSelector(
    (state) => state.IXStore?.updateAnionRegenData
  );
  const ixStore = useSelector((state) => state.IXStore?.data?.listAdvRegen);
  const ixStore1 = useSelector((state) => state.IXStore?.data?.listAdvRegen[0]);
  const ixStore2 = useSelector((state) => state.IXStore?.data?.listAdvRegen[1]);
  const { vessel1, vessel2, vessel3, vessel4, anionResin, cationResin } =
    useSelector((state) => state.IXStore.data);
  const { updateAdvCationObject, updateAdvAnionObject } = useSelector(
    (state) => state.IXStore
  );
  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setAutoFocusValue(false);
    }
  };

  useEffect(() => {
    if (!ixStore.length) {
      const selectedResin = {
        ...cationRegenData,
        ["vesselID"]: 0,
        ["bwFrequency"]: 0,
        ["bwExpansion"]: cationAdvRegen?.typicalValue?.bWExpansion,
        ["bwDuration"]: cationAdvRegen?.typicalValue?.bWDuration,
        ["compactionDuration"]:
          cationAdvRegen?.typicalValue?.compactionDuration,
        ["regenerationVelocity"]:
          unit.selectedUnits[10] === "BV/h"
            ? cationAdvRegen?.typicalValue?.regSpaceVelocity
            : parseFloat(
                GlobalUnitConversion(
                  GlobalUnitConversionStore,
                  cationAdvRegen?.typicalValue?.regSpaceVelocity,
                  unit.selectedUnits[10],
                  "BV/h"
                )
              ).toFixed(2),

        ["regenerationFactor"]: 100,
        ["displacementFlow"]: 0,
        ["displacementVolume"]:
          cationAdvRegen?.typicalValue?.displacementRinseVolume,
        ["fatRinseRecycle"]: 4,
        ["fatRinseVolume"]: cationAdvRegen?.typicalValue?.fastRisneValue,
        ["settingDuration"]: 0,
      };
      dispatch(updateCationRegen(selectedResin));
    }
  }, [cationAdvRegen, dispatch]);
  useEffect(() => {
    if (!ixStore.length || !ixStore2) {
      const selectedResin = {
        ...AnionRegenData,
        ["vesselID"]: 0,
        ["bwFrequency"]: 0,
        ["bwExpansion"]: anionAdvRegen?.typicalValue?.bWExpansion,
        ["bwDuration"]: anionAdvRegen?.typicalValue?.bWDuration,
        ["compactionDuration"]: anionAdvRegen?.typicalValue?.compactionDuration,
        ["regenerationVelocity"]:  unit.selectedUnits[10] === "BV/h"
        ?      anionAdvRegen?.typicalValue?.regSpaceVelocity
        : parseFloat(
            GlobalUnitConversion(
              GlobalUnitConversionStore,
              anionAdvRegen?.typicalValue?.regSpaceVelocity,
              unit.selectedUnits[10],
              "BV/h"
            )
          ).toFixed(2),
   
        ["regenerationFactor"]: 100,
        ["displacementFlow"]: 0,
        ["displacementVolume"]:
          anionAdvRegen?.typicalValue?.displacementRinseVolume,
        ["fatRinseRecycle"]: 4,
        ["fatRinseVolume"]: anionAdvRegen?.typicalValue?.fastRisneValue,
        ["settingDuration"]: 0,
      };
      dispatch(updateAnionRegen(selectedResin));
    }
  }, [anionAdvRegen, dispatch]);

  useEffect(() => {
    const { updateObject, updateAnionObject } = IXDUtility(
      cationResin,
      anionResin,
      vessel1,
      vessel2,
      vessel3,
      vessel4,
      updateAdvCationObject,
      updateAdvAnionObject
    );
    dispatch(updateAdvCation(updateObject));
    dispatch(updateAdvAnion(updateAnionObject));
  }, []);

  const mBChecker1 =
    (cationResin === 9 && anionResin === 9 && vessel1 === 8) ||
    (cationResin === 10 && anionResin === 10 && vessel1 === 2);

  const advancedRegenerationData = [
    {
      title: "Regeneration Conditions",
      mainTitle: "true",
    },
    {
      title: ` ${
        cationAdvRegen?.advRegncondBackwashFreq
          ? cationAdvRegen?.advRegncondBackwashFreq
          : "Backwash Frequency (Cycles Between BW)"
      }`,
    },
    {
      title: ` ${
        cationAdvRegen?.advRegncondBackwashExp
          ? cationAdvRegen?.advRegncondBackwashExp
          : "Backwash Expansion (%)"
      }`,
    },
    {
      title: ` ${
        cationAdvRegen?.advRegncondBackwashDuration
          ? cationAdvRegen?.advRegncondBackwashDuration
          : "Backwash Duration (min)"
      }`,
    },
    { title: "Compaction Duration (min)" },
    { title: `Regeneration Specific Velocity (${unit.selectedUnits[10]})` },
    {
      title: ` ${
        cationAdvRegen?.advRegncondHoldDownFactor
          ? cationAdvRegen?.advRegncondHoldDownFactor
          : "Regeneration Hold Down Factor (%)"
      }`,
    },
    { title: "Displacement Rinse Flow" },
    { title: "Displacement Rinse Volume (BV)" },
    { title: "Fast Rinse Volume (BV)" },
    { title: "Fast Rinse Recycle" },
    { title: "Settling Duration (min)" },
  ];
  const cationResinData = [
    {
      defaultValue: "1",
      refText: "Ranges XX-YYYY",
      title: "Cation Resin Conditions",
    },
    {
      defaultValue: "1",
      value: ixStore1?.bwFrequency,
      name: "bwFrequency",
      disabled: updateAdvCationObject?.bwFrequency,
      error: ixStore1?.bwFrequency < 1 ? true : false,
    },
    {
      defaultValue: "1",
      refText:
        updateAdvCationObject?.bwExpansion === false &&
        `Ranges ${
          cationAdvRegen?.minMaxRange?.bWExpMIN
            ? cationAdvRegen?.minMaxRange?.bWExpMIN
            : 0
        }-${
          cationAdvRegen?.minMaxRange?.bWExpMAX
            ? cationAdvRegen?.minMaxRange?.bWExpMAX
            : 0
        }`,
      value: ixStore1?.bwExpansion,
      name: "bwExpansion",
      disabled: updateAdvCationObject?.bwExpansion,
      error:
        ixStore1?.bwExpansion < cationAdvRegen?.minMaxRange?.bWExpMIN ||
        ixStore1?.bwExpansion > cationAdvRegen?.minMaxRange?.bWExpMAX
          ? true
          : false,
    },
    {
      defaultValue: "1",
      refText:
        updateAdvCationObject?.bwDuration === false &&
        `Ranges ${
          cationAdvRegen?.minMaxRange?.bWDurMIN
            ? cationAdvRegen?.minMaxRange?.bWDurMIN
            : 0
        }-${
          cationAdvRegen?.minMaxRange?.bWDurMAX
            ? cationAdvRegen?.minMaxRange?.bWDurMAX
            : 0
        }`,
      value: ixStore1?.bwDuration,
      name: "bwDuration",
      disabled: updateAdvCationObject?.bwDuration,
      error:
        ixStore1?.bwDuration < cationAdvRegen?.minMaxRange?.bWDurMIN ||
        ixStore1?.bwDuration > cationAdvRegen?.minMaxRange?.bWDurMAX
          ? true
          : false,
    },
    {
      defaultValue: "1",
      refText:
        updateAdvCationObject?.compactionDuration === false &&
        `Ranges ${
          cationAdvRegen?.minMaxRange?.compDurMIN
            ? cationAdvRegen?.minMaxRange?.compDurMIN
            : 0
        }-${
          cationAdvRegen?.minMaxRange?.compDurMAX
            ? cationAdvRegen?.minMaxRange?.compDurMAX
            : 0
        }`,
      value: ixStore1?.compactionDuration,
      name: "compactionDuration",
      disabled: updateAdvCationObject?.compactionDuration,
      error:
        ixStore1?.compactionDuration <
          cationAdvRegen?.minMaxRange?.compDurMIN ||
        ixStore1?.compactionDuration > cationAdvRegen?.minMaxRange?.compDurMAX
          ? true
          : false,
    },
    {
      defaultValue: "1",
      refText:
        updateAdvCationObject?.regenerationVelocity === false &&
        `Ranges ${
          unit.selectedUnits[10] === "BV/h"
            ? cationAdvRegen?.minMaxRange?.regSpacevelmin
              ? cationAdvRegen?.minMaxRange?.regSpacevelmin
              : 0
            : GlobalUnitConversion(
                GlobalUnitConversionStore,
                cationAdvRegen?.minMaxRange?.regSpacevelmin,
                unit.selectedUnits[10],
                "BV/h"
              ).toFixed(2)
        }-${
          unit.selectedUnits[10] === "BV/h"
            ? cationAdvRegen?.minMaxRange?.regSpacevelmax
              ? cationAdvRegen?.minMaxRange?.regSpacevelmax
              : 0
            : GlobalUnitConversion(
                GlobalUnitConversionStore,
                cationAdvRegen?.minMaxRange?.regSpacevelmax,
                unit.selectedUnits[10],
                "BV/h"
              ).toFixed(2)
        }`,
      value: ixStore1?.regenerationVelocity,
      name: "regenerationVelocity",
      disabled: updateAdvCationObject?.regenerationVelocity,

      error:
        ixStore1?.regenerationVelocity <
          (unit.selectedUnits[10] === "BV/h"
            ? cationAdvRegen?.minMaxRange?.regSpacevelmin
            : Number(
                GlobalUnitConversion(
                  GlobalUnitConversionStore,
                  cationAdvRegen?.minMaxRange?.regSpacevelmin,
                  unit.selectedUnits[10],
                  "BV/h"
                ).toFixed(2)
              )) ||
        ixStore1?.regenerationVelocity >
          (unit.selectedUnits[10] === "BV/h"
            ? cationAdvRegen?.minMaxRange?.regSpacevelmax
            : Number(
                GlobalUnitConversion(
                  GlobalUnitConversionStore,
                  cationAdvRegen?.minMaxRange?.regSpacevelmax,
                  unit.selectedUnits[10],
                  "BV/h"
                ).toFixed(2)
              ))
          ? true
          : false,
    },
    {
      defaultValue: "1",
      refText: mBChecker1
        ? ""
        : updateAdvCationObject?.regenerationFactor === false && "Ranges 0-100",
      value: ixStore1?.regenerationFactor,
      name: "regenerationFactor",
      disabled: updateAdvCationObject?.regenerationFactor,

      error: mBChecker1
        ? false
        : ixStore1?.regenerationFactor < 0 || ixStore1?.regenerationFactor > 100
        ? true
        : false,
    },
    {
      defaultValue: "1",
      refText: "Ranges XX-YYYY",
      radioInput: [
        {
          label: "@Regen Flow",
          name: "group1",
          value: 0,
          checked: ixStore1?.displacementFlow === 0,
          disabled: updateAdvCationObject?.displacementFlow,
        },
        {
          label: "@Dilution Flow",
          name: "group1",
          value: 1,
          checked: ixStore1?.displacementFlow === 1,
          disabled: updateAdvCationObject?.displacementFlow,
        },
      ],
    },
    {
      defaultValue: "1",
      refText:
        updateAdvCationObject?.displacementVolume === false &&
        `Ranges ${
          unit.selectedUnits[13] === "BV"
            ? cationAdvRegen?.minMaxRange?.dispRinseMIN
              ? cationAdvRegen?.minMaxRange?.dispRinseMIN
              : 0
            : GlobalUnitConversion(
                GlobalUnitConversionStore,
                cationAdvRegen?.minMaxRange?.dispRinseMIN,
                unit.selectedUnits[13],
                "BV"
              ).toFixed(2)
        }-${
          unit.selectedUnits[13] === "BV"
            ? cationAdvRegen?.minMaxRange?.dispRinseMAX
              ? cationAdvRegen?.minMaxRange?.dispRinseMAX
              : 0
            : GlobalUnitConversion(
                GlobalUnitConversionStore,
                cationAdvRegen?.minMaxRange?.dispRinseMAX,
                unit.selectedUnits[13],
                "BV"
              ).toFixed(2)
        }`,
      value: ixStore1?.displacementVolume,
      disabled: updateAdvCationObject?.displacementVolume,

      name: "displacementVolume",
      error:
        ixStore1?.displacementVolume <
          cationAdvRegen?.minMaxRange?.dispRinseMIN ||
        ixStore1?.displacementVolume > cationAdvRegen?.minMaxRange?.dispRinseMAX
          ? true
          : false,
    },
    {
      defaultValue: "1",
      refText:
        updateAdvCationObject?.fatRinseVolume === false &&
        `Ranges ${
          unit.selectedUnits[13] === "BV"
            ? cationAdvRegen?.minMaxRange?.fastRinseMIN
              ? cationAdvRegen?.minMaxRange?.fastRinseMIN
              : 0
            : GlobalUnitConversion(
                GlobalUnitConversionStore,
                cationAdvRegen?.minMaxRange?.fastRinseMIN,
                unit.selectedUnits[13],
                "BV"
              ).toFixed(2)
        }-${
          unit.selectedUnits[13] === "BV"
            ? cationAdvRegen?.minMaxRange?.fastRinseMAX
              ? cationAdvRegen?.minMaxRange?.fastRinseMAX
              : 0
            : GlobalUnitConversion(
                GlobalUnitConversionStore,
                cationAdvRegen?.minMaxRange?.fastRinseMAX,
                unit.selectedUnits[13],
                "BV"
              ).toFixed(2)
        }`,
      value: ixStore1?.fatRinseVolume,
      name: "fatRinseVolume",
      disabled: updateAdvCationObject?.fatRinseVolume,

      error:
        ixStore1?.fatRinseVolume < cationAdvRegen?.minMaxRange?.fastRinseMIN ||
        ixStore1?.fatRinseVolume > cationAdvRegen?.minMaxRange?.fastRinseMAX
          ? true
          : false,
    },
    {
      defaultValue: "1",
      // value: ixStore1?.bwExpansion,
      refText: "Ranges XX-YYYY",
      radioInput: [
        {
          label: "none",
          name: "group2",
          value: 1,
          checked: ixStore1?.fatRinseRecycle === 1,
          disabled: updateAdvCationObject?.fatRinseRecycle,
        },
        {
          label: "After 3 Min",
          name: "group2",
          value: 2,
          checked: ixStore1?.fatRinseRecycle === 2,
          disabled: updateAdvCationObject?.fatRinseRecycle,
        },
        {
          label: "Full",
          name: "group2",
          value: 3,
          checked: ixStore1?.fatRinseRecycle === 3,
          disabled: updateAdvCationObject?.fatRinseRecycle,
        },
      ],
    },
    {
      defaultValue: "last",
      // refText: "Ranges XX-YYYY",
      value: ixStore1?.settingDuration,
      disabled: updateAdvCationObject?.settingDuration,
      name: "settingDuration",
    },
  ];
  const anionsResinData = [
    {
      defaultValue: "1",
      refText: "Ranges XX-YYYY",
      title: "Anion Resin Conditions",
    },
    {
      defaultValue: "1",
      // refText: "Ranges XX-YYYY",
      value: ixStore2?.bwFrequency,
      name: "bwFrequency",
      disabled: updateAdvAnionObject?.bwFrequency,
      error: ixStore2?.bwFrequency < 1 ? true : false,
    },
    {
      defaultValue: "1",
      refText:
        updateAdvAnionObject?.bwExpansion === false &&
        `Ranges ${
          anionAdvRegen?.minMaxRange?.bWExpMIN
            ? anionAdvRegen?.minMaxRange?.bWExpMIN
            : 0
        }-${
          anionAdvRegen?.minMaxRange?.bWExpMAX
            ? anionAdvRegen?.minMaxRange?.bWExpMAX
            : 0
        }`,
      value: ixStore2?.bwExpansion,
      name: "bwExpansion",
      disabled: updateAdvAnionObject?.bwExpansion,

      error:
        ixStore2?.bwExpansion < anionAdvRegen?.minMaxRange?.bWExpMIN ||
        ixStore2?.bwExpansion > anionAdvRegen?.minMaxRange?.bWExpMAX
          ? true
          : false,
    },
    {
      defaultValue: "1",
      refText:
        updateAdvAnionObject?.bwDuration === false &&
        `Ranges ${
          anionAdvRegen?.minMaxRange?.bWDurMIN
            ? anionAdvRegen?.minMaxRange?.bWDurMIN
            : 0
        }-${
          anionAdvRegen?.minMaxRange?.bWDurMAX
            ? anionAdvRegen?.minMaxRange?.bWDurMAX
            : 0
        }`,
      value: ixStore2?.bwDuration,
      name: "bwDuration",
      disabled: updateAdvAnionObject?.bwDuration,

      error:
        ixStore2?.bwDuration < anionAdvRegen?.minMaxRange?.bWDurMIN ||
        ixStore2?.bwDuration > anionAdvRegen?.minMaxRange?.bWDurMAX
          ? true
          : false,
    },
    {
      defaultValue: "1",
      refText:
        updateAdvAnionObject?.compactionDuration === false &&
        `Ranges ${
          anionAdvRegen?.minMaxRange?.compDurMIN
            ? anionAdvRegen?.minMaxRange?.compDurMIN
            : 0
        }-${
          anionAdvRegen?.minMaxRange?.compDurMAX
            ? anionAdvRegen?.minMaxRange?.compDurMAX
            : 0
        }`,
      value: ixStore2?.compactionDuration,
      name: "compactionDuration",
      disabled: updateAdvAnionObject?.compactionDuration,

      error:
        ixStore2?.compactionDuration < anionAdvRegen?.minMaxRange?.compDurMIN ||
        ixStore2?.compactionDuration > anionAdvRegen?.minMaxRange?.compDurMAX
          ? true
          : false,
    },
    {
      defaultValue: "1",
      value: ixStore2?.regenerationVelocity,
      name: "regenerationVelocity",
      disabled: updateAdvAnionObject?.regenerationVelocity,

      refText:
        updateAdvAnionObject?.regenerationVelocity === false &&
        `Ranges ${
          unit.selectedUnits[10] === "BV/h"
            ? anionAdvRegen?.minMaxRange?.regSpacevelmin
              ? anionAdvRegen?.minMaxRange?.regSpacevelmin
              : 0
            : GlobalUnitConversion(
                GlobalUnitConversionStore,
                anionAdvRegen?.minMaxRange?.regSpacevelmin,
                unit.selectedUnits[10],
                "BV/h"
              ).toFixed(2)
        }-${
          unit.selectedUnits[10] === "BV/h"
            ? anionAdvRegen?.minMaxRange?.regSpacevelmax
              ? anionAdvRegen?.minMaxRange?.regSpacevelmax
              : 0
            : GlobalUnitConversion(
                GlobalUnitConversionStore,
                anionAdvRegen?.minMaxRange?.regSpacevelmax,
                unit.selectedUnits[10],
                "BV/h"
              ).toFixed(2)
        }`,

      error:
        ixStore2?.regenerationVelocity <
          (unit.selectedUnits[10] === "BV/h"
            ? anionAdvRegen?.minMaxRange?.regSpacevelmin
            : Number(
                GlobalUnitConversion(
                  GlobalUnitConversionStore,
                  anionAdvRegen?.minMaxRange?.regSpacevelmin,
                  unit.selectedUnits[10],
                  "BV/h"
                ).toFixed(2)
              )) ||
        ixStore2?.regenerationVelocity >
          (unit.selectedUnits[10] === "BV/h"
            ? anionAdvRegen?.minMaxRange?.regSpacevelmax
            : Number(
                GlobalUnitConversion(
                  GlobalUnitConversionStore,
                  anionAdvRegen?.minMaxRange?.regSpacevelmax,
                  unit.selectedUnits[10],
                  "BV/h"
                ).toFixed(2)
              ))
          ? true
          : false,
    },
    {
      defaultValue: "1",
      refText: mBChecker1
        ? ""
        : updateAdvAnionObject?.regenerationFactor === false && "Ranges 0-100",
      value: ixStore2?.regenerationFactor,
      name: "regenerationFactor",
      disabled: updateAdvAnionObject?.regenerationFactor,

      error: mBChecker1
        ? false
        : ixStore2?.regenerationFactor < 0 || ixStore2?.regenerationFactor > 100
        ? true
        : false,
    },
    {
      defaultValue: "1",
      refText: "Ranges XX-YYYY",
      radioInput: [
        {
          label: "@Regen Flow",
          name: "group3",
          value: 0,
          checked: ixStore2?.displacementFlow === 0,
          disabled: updateAdvAnionObject?.displacementFlow,
        },
        {
          label: "@Dilution Flow",
          name: "group3",
          value: 1,
          checked: ixStore2?.displacementFlow === 1,
          disabled: updateAdvAnionObject?.displacementFlow,
        },
      ],
      value: "2",
    },
    {
      defaultValue: "1",
      value: ixStore2?.displacementVolume,
      name: "displacementVolume",
      disabled: updateAdvAnionObject?.displacementVolume,

      error:
        ixStore2?.displacementVolume <
          anionAdvRegen?.minMaxRange?.dispRinseMIN ||
        ixStore2?.displacementVolume > anionAdvRegen?.minMaxRange?.dispRinseMAX
          ? true
          : false,
      refText:
        updateAdvAnionObject?.displacementVolume === false &&
        `Ranges ${
          unit.selectedUnits[13] === "BV"
            ? anionAdvRegen?.minMaxRange?.dispRinseMIN
              ? anionAdvRegen?.minMaxRange?.dispRinseMIN
              : 0
            : GlobalUnitConversion(
                GlobalUnitConversionStore,
                anionAdvRegen?.minMaxRange?.dispRinseMIN,
                unit.selectedUnits[13],
                "BV"
              ).toFixed(2)
        }-${
          unit.selectedUnits[13] === "BV"
            ? anionAdvRegen?.minMaxRange?.dispRinseMAX
              ? anionAdvRegen?.minMaxRange?.dispRinseMAX
              : 0
            : GlobalUnitConversion(
                GlobalUnitConversionStore,
                anionAdvRegen?.minMaxRange?.dispRinseMAX,
                unit.selectedUnits[13],
                "BV"
              ).toFixed(2)
        }`,
    },
    {
      defaultValue: "1",
      name: "fatRinseVolume",
      refText:
        updateAdvAnionObject?.fatRinseVolume === false &&
        `Ranges ${
          unit.selectedUnits[13] === "BV"
            ? anionAdvRegen?.minMaxRange?.fastRinseMIN
              ? anionAdvRegen?.minMaxRange?.fastRinseMIN
              : 0
            : GlobalUnitConversion(
                GlobalUnitConversionStore,
                anionAdvRegen?.minMaxRange?.fastRinseMIN,
                unit.selectedUnits[13],
                "BV"
              ).toFixed(2)
        }-${
          unit.selectedUnits[13] === "BV"
            ? anionAdvRegen?.minMaxRange?.fastRinseMAX
              ? anionAdvRegen?.minMaxRange?.fastRinseMAX
              : 0
            : GlobalUnitConversion(
                GlobalUnitConversionStore,
                anionAdvRegen?.minMaxRange?.fastRinseMAX,
                unit.selectedUnits[13],
                "BV"
              ).toFixed(2)
        }`,
      value: ixStore2?.fatRinseVolume,
      disabled: updateAdvAnionObject?.fatRinseVolume,

      error:
        ixStore2?.fatRinseVolume < anionAdvRegen?.minMaxRange?.fastRinseMIN ||
        ixStore2?.fatRinseVolume > anionAdvRegen?.minMaxRange?.fastRinseMAX
          ? true
          : false,
    },
    {
      defaultValue: "1",
      refText: "Ranges XX-YYYY",
      value: "2",

      radioInput: [
        {
          label: "none",
          name: "group4",
          value: 1,
          checked: ixStore2?.fatRinseRecycle === 1,
          disabled: updateAdvAnionObject?.fatRinseRecycle,
        },
        {
          label: "After 3 Min",
          name: "group4",
          value: 2,
          checked: ixStore2?.fatRinseRecycle === 2,
          disabled: updateAdvAnionObject?.fatRinseRecycle,
        },
        {
          label: "Full",
          name: "group4",
          value: 3,
          checked: ixStore2?.fatRinseRecycle === 3,
          disabled: updateAdvAnionObject?.fatRinseRecycle,
        },
      ],
    },
    {
      defaultValue: "1",
      // refText: "Ranges XX-YYYY",
      value: ixStore2?.settingDuration,
      name: "settingDuration",
      disabled: updateAdvAnionObject?.settingDuration,
    },
  ];

  const CationRangeValidatior = {
    bwFrequency: {
      minValue: 1,
    },
    bwExpansion: {
      minValue: cationAdvRegen?.minMaxRange?.bWExpMIN,
      maxValue: cationAdvRegen?.minMaxRange?.bWExpMAX,
    },
    bwDuration: {
      minValue: cationAdvRegen?.minMaxRange?.bWDurMIN,
      maxValue: cationAdvRegen?.minMaxRange?.bWDurMAX,
    },
    compactionDuration: {
      minValue: cationAdvRegen?.minMaxRange?.compDurMIN,
      maxValue: cationAdvRegen?.minMaxRange?.compDurMAX,
    },
    regenerationVelocity: {
      minValue:
        unit.selectedUnits[10] === "BV/h"
          ? cationAdvRegen?.minMaxRange?.regSpacevelmin
          : GlobalUnitConversion(
              GlobalUnitConversionStore,
              cationAdvRegen?.minMaxRange?.regSpacevelmin,
              unit.selectedUnits[10],
              "BV/h"
            )?.toFixed(2),
      maxValue:
        unit.selectedUnits[10] === "BV/h"
          ? cationAdvRegen?.minMaxRange?.regSpacevelmax
          : GlobalUnitConversion(
              GlobalUnitConversionStore,
              cationAdvRegen?.minMaxRange?.regSpacevelmax,
              unit.selectedUnits[10],
              "BV/h"
            )?.toFixed(2),
    },
    regenerationFactor: {
      minValue: 0,
      maxValue: 100,
    },
    displacementVolume: {
      minValue:
        unit.selectedUnits[13] === "BV"
          ? cationAdvRegen?.minMaxRange?.dispRinseMIN
          : GlobalUnitConversion(
              GlobalUnitConversionStore,
              cationAdvRegen?.minMaxRange?.dispRinseMIN,
              unit.selectedUnits[13],
              "BV"
            )?.toFixed(2),

      maxValue:
        unit.selectedUnits[13] === "BV"
          ? cationAdvRegen?.minMaxRange?.dispRinseMAX
          : GlobalUnitConversion(
              GlobalUnitConversionStore,
              cationAdvRegen?.minMaxRange?.dispRinseMAX,
              unit.selectedUnits[13],
              "BV"
            )?.toFixed(2),
    },
    fatRinseVolume: {
      minValue:
        unit.selectedUnits[13] === "BV"
          ? cationAdvRegen?.minMaxRange?.fastRinseMIN
          : GlobalUnitConversion(
              GlobalUnitConversionStore,
              cationAdvRegen?.minMaxRange?.fastRinseMIN,
              unit.selectedUnits[13],
              "BV"
            )?.toFixed(2),
      maxValue:
        unit.selectedUnits[13] === "BV"
          ? cationAdvRegen?.minMaxRange?.fastRinseMAX
          : GlobalUnitConversion(
              GlobalUnitConversionStore,
              cationAdvRegen?.minMaxRange?.fastRinseMAX,
              unit.selectedUnits[13],
              "BV"
            )?.toFixed(2),
    },
  };
  const AnionRangeValidatior = {
    bwFrequency: {
      minValue: 1,
    },
    bwExpansion: {
      minValue: anionAdvRegen?.minMaxRange?.bWExpMIN,
      maxValue: anionAdvRegen?.minMaxRange?.bWExpMAX,
    },
    bwDuration: {
      minValue: anionAdvRegen?.minMaxRange?.bWDurMIN,
      maxValue: anionAdvRegen?.minMaxRange?.bWDurMAX,
    },
    compactionDuration: {
      minValue: anionAdvRegen?.minMaxRange?.compDurMIN,
      maxValue: anionAdvRegen?.minMaxRange?.compDurMAX,
    },
    regenerationVelocity: {
      minValue:
        unit.selectedUnits[10] === "BV/h"
          ? anionAdvRegen?.minMaxRange?.regSpacevelmin
          : GlobalUnitConversion(
              GlobalUnitConversionStore,
              anionAdvRegen?.minMaxRange?.regSpacevelmin,
              unit.selectedUnits[10],
              "BV/h"
            )?.toFixed(2),

      maxValue:
        unit.selectedUnits[10] === "BV/h"
          ? anionAdvRegen?.minMaxRange?.regSpacevelmax
          : GlobalUnitConversion(
              GlobalUnitConversionStore,
              anionAdvRegen?.minMaxRange?.regSpacevelmax,
              unit.selectedUnits[10],
              "BV/h"
            )?.toFixed(2),
    },
    regenerationFactor: {
      minValue: 0,
      maxValue: 100,
    },
    displacementVolume: {
      minValue: anionAdvRegen?.minMaxRange?.dispRinseMIN,
      maxValue: anionAdvRegen?.minMaxRange?.dispRinseMAX,
    },
    fatRinseVolume: {
      minValue: anionAdvRegen?.minMaxRange?.fastRinseMIN,
      maxValue: anionAdvRegen?.minMaxRange?.fastRinseMAX,
    },
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (e.target.name == "bwFrequency") {
      if (
        value < CationRangeValidatior[name]?.minValue ||
        value > CationRangeValidatior[name]?.maxValue ||
        isNaN(value)
      ) {
        setAutoFocusValue(true);
        setMessage("Please enter a positive number!");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        dispatch(
          updateCationRegen({
            ...ixStore1,
            [e.target.name]: parseFloat(e.target.value).toFixed(2),
          })
        );
      }
    } else {
      if (
        value < parseFloat(CationRangeValidatior[name]?.minValue) ||
        value > parseFloat(CationRangeValidatior[name]?.maxValue) ||
        isNaN(value)
      ) {
        setAutoFocusValue(true);
        setMessage("Please enter a value within the valid range!");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        if (e.target.name === "fatRinseVolume") {
          // const selectedResin = {
          //   ...ixStore1,
          //   ["fatRinseVolume"]: parseFloat(e.target.value).toFixed(2),
          // };
          // const secondSelectedResin = {
          //   ...ixStore2,
          //   ["fatRinseVolume"]: parseFloat(e.target.value).toFixed(2),
          // };
          dispatch(
            updateCationRegen({
              ...ixStore1,
              ["fatRinseVolume"]: parseFloat(e.target.value).toFixed(2),
            })
          );
          dispatch(
            updateAnionRegen({
              ...ixStore2,
              ["fatRinseVolume"]: parseFloat(e.target.value).toFixed(2),
            })
          );
        } else if (
          (e.target.name === "bwExpansion" &&
            anionResin === 9 &&
            cationResin === 9 &&
            vessel1 === 8) ||
          (e.target.name === "bwExpansion" &&
            anionResin === 9 &&
            cationResin === 9 &&
            vessel1 === 9)
        ) {
          // const selectedResin = {
          //   ...ixStore1,
          //   ["bwExpansion"]: parseFloat(e.target.value).toFixed(2),
          // };
          // const secondSelectedResin = {
          //   ...ixStore2,
          //   ["bwExpansion"]: parseFloat(e.target.value).toFixed(2),
          // };
          dispatch(
            updateCationRegen({
              ...ixStore1,
              ["bwExpansion"]: parseFloat(e.target.value).toFixed(2),
            })
          );
          dispatch(
            updateAnionRegen({
              ...ixStore2,
              ["bwExpansion"]: parseFloat(e.target.value).toFixed(2),
            })
          );
        } else if (
          (e.target.name === "bwDuration" &&
            anionResin === 9 &&
            cationResin === 9 &&
            vessel1 === 8) ||
          (e.target.name === "bwDuration" &&
            anionResin === 9 &&
            cationResin === 9 &&
            vessel1 === 9)
        ) {
          // const selectedResin = {
          //   ...ixStore1,
          //   ["bwDuration"]: parseFloat(e.target.value).toFixed(2),
          // };
          // const secondSelectedResin = {
          //   ...ixStore2,
          //   ["bwDuration"]: parseFloat(e.target.value).toFixed(2),
          // };
          dispatch(
            updateCationRegen({
              ...ixStore1,
              ["bwDuration"]: parseFloat(e.target.value).toFixed(2),
            })
          );
          dispatch(
            updateAnionRegen({
              ...ixStore2,
              ["bwDuration"]: parseFloat(e.target.value).toFixed(2),
            })
          );
        } else {
          // const selectedResin = {
          //   ...ixStore1,
          //   [e.target.name]: parseFloat(e.target.value).toFixed(2),
          // };
          dispatch(
            updateCationRegen({
              ...ixStore1,
              [e.target.name]: parseFloat(e.target.value).toFixed(2),
            })
          );
        }
      }
    }
  };
  const handleAnionBlur = (e) => {
    const { name, value } = e.target;
    if (e.target.name == "bwFrequency") {
      if (
        value < AnionRangeValidatior[name]?.minValue ||
        value > AnionRangeValidatior[name]?.maxValue ||
        isNaN(value)
      ) {
        setAutoFocusValue(true);
        setMessage("Please enter a positive number!");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        dispatch(
          updateAnionRegen({
            ...ixStore2,
            [e.target.name]: parseFloat(e.target.value).toFixed(2),
          })
        );
      }
    } else {
      if (
        value < parseFloat(AnionRangeValidatior[name]?.minValue) ||
        value > parseFloat(AnionRangeValidatior[name]?.maxValue) ||
        isNaN(value)
      ) {
        setAutoFocusValue(true);
        setMessage("Please enter a value within the valid range!");
        setTimeout(() => {
          e.target.focus();
        }, 0);
      } else {
        // const selectedResin = {
        //   ...ixStore2,
        //   [e.target.name]: parseFloat(e.target.value).toFixed(2),
        // };
        dispatch(
          updateAnionRegen({
            ...ixStore2,
            [e.target.name]: parseFloat(e.target.value).toFixed(2),
          })
        );
      }
    }
  };
  const handleCationChange = (e) => {
    if (e.target.name === "fatRinseVolume") {
      const selectedResin = {
        ...ixStore1,
        ["fatRinseVolume"]: parseFloat(e.target.value),
      };
      const secondSelectedResin = {
        ...ixStore2,
        ["fatRinseVolume"]: parseFloat(e.target.value),
      };
      dispatch(updateCationRegen(selectedResin));
      dispatch(updateAnionRegen(secondSelectedResin));
    } else if (
      (e.target.name === "bwExpansion" &&
        anionResin === 9 &&
        cationResin === 9 &&
        vessel1 === 8) ||
      (e.target.name === "bwExpansion" &&
        anionResin === 9 &&
        cationResin === 9 &&
        vessel1 === 9)
    ) {
      const selectedResin = {
        ...ixStore1,
        ["bwExpansion"]: parseFloat(e.target.value),
      };
      const secondSelectedResin = {
        ...ixStore2,
        ["bwExpansion"]: parseFloat(e.target.value),
      };
      dispatch(updateCationRegen(selectedResin));
      dispatch(updateAnionRegen(secondSelectedResin));
    } else if (
      (e.target.name === "bwDuration" &&
        anionResin === 9 &&
        cationResin === 9 &&
        vessel1 === 8) ||
      (e.target.name === "bwDuration" &&
        anionResin === 9 &&
        cationResin === 9 &&
        vessel1 === 9)
    ) {
      const selectedResin = {
        ...ixStore1,
        ["bwDuration"]: parseFloat(e.target.value),
      };
      const secondSelectedResin = {
        ...ixStore2,
        ["bwDuration"]: parseFloat(e.target.value),
      };
      dispatch(updateCationRegen(selectedResin));
      dispatch(updateAnionRegen(secondSelectedResin));
    } else {
      const selectedResin = {
        ...ixStore1,
        [e.target.name]: parseFloat(e.target.value),
      };
      dispatch(updateCationRegen(selectedResin));
    }
  };
  const handleAnionChange = (e) => {
    const selectedResin = {
      ...ixStore2,
      [e.target.name]: parseFloat(e.target.value),
    };
    dispatch(updateAnionRegen(selectedResin));
  };
  const handleCationCheck = (e) => {
    const { name, value } = e.target;
    if (name === "group1") {
      const selectedResin = {
        ...ixStore1,
        ["displacementFlow"]: parseFloat(value),
      };
      dispatch(updateCationRegen(selectedResin));
    } else if (name === "group2") {
      const selectedResin = {
        ...ixStore1,
        ["fatRinseRecycle"]: parseFloat(value),
      };
      dispatch(updateCationRegen(selectedResin));
      const secondSelectedResin = {
        ...ixStore2,
        ["fatRinseRecycle"]: parseFloat(value),
      };
      dispatch(updateAnionRegen(secondSelectedResin));
    }
  };
  const handleAnionCheck = (e) => {
    const { name, value } = e.target;
    if (name === "group3") {
      const selectedResin = {
        ...ixStore2,
        ["displacementFlow"]: parseFloat(value),
      };
      dispatch(updateAnionRegen(selectedResin));
    } else if (name === "group4") {
      const selectedResin = {
        ...ixStore2,
        ["fatRinseRecycle"]: parseFloat(value),
      };
      dispatch(updateAnionRegen(selectedResin));
    }
  };
  return (
    <>
      <AdvancedRegenerationStyled className="g-0">
        <SystemDiagram />
        <StyledCard className="advance-regeneration-card">
          <div className="advance-regeneration-card-body">
            <div className="title-wrapper">
              <Table className="title-table">
                <tbody>
                  {advancedRegenerationData.map((item, index) =>
                    item.mainTitle ? (
                      <tr key={index}>
                        <td>
                          <CustomHeading
                            fontSize="14px"
                            fontFamily="NotoSansRegular"
                            color={colors.PrimaryDarkAquaMarine}
                            fontWeight="400"
                            label={item.title}
                          />
                        </td>
                      </tr>
                    ) : (
                      <tr key={index}>
                        <td className="regeneration-condition">
                          <CustomLabel label={item.title} />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>
            <div className="cation-anion-table-wrapper">
              <Table className="cation-table">
                <tbody>
                  {cationResinData.map((item, index) =>
                    item.title ? (
                      <tr key={index}>
                        <td>
                          <CustomHeading
                            fontSize="14px"
                            fontFamily="NotoSansRegular"
                            color={colors.PrimaryDarkAquaMarine}
                            fontWeight="400"
                            label={item.title}
                          />
                        </td>
                      </tr>
                    ) : item.radioInput ? (
                      <tr key={index}>
                        <td key={index} className="radio-option">
                          {item.radioInput.map((radioData, index) => (
                            <CustomRadio
                              key={index}
                              type="radio"
                              label={radioData.label}
                              name={radioData.name}
                              value={radioData.value}
                              onChange={handleCationCheck}
                              checked={radioData.checked}
                              disabled={item.disabled}
                            />
                          ))}
                        </td>
                      </tr>
                    ) : (
                      <tr key={index}>
                        <td className="input-ref-text-wrapper">
                          <CustomInput
                            type="number"
                            isWarning={false}
                            defaultValue={item.defaultValue}
                            value={item.value}
                            name={item.name}
                            onChange={handleCationChange}
                            isError={item.error}
                            disabled={item.disabled}
                            onBlur={(e) => handleBlur(e)}
                          />
                          <InputReferenceText refText={item.refText} />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
              <Table className="anion-table">
                <tbody>
                  {anionsResinData.map((item, index) =>
                    item.title ? (
                      <tr key={index}>
                        <td>
                          <CustomHeading
                            fontSize="14px"
                            fontFamily="NotoSansRegular"
                            color={colors.PrimaryDarkAquaMarine}
                            fontWeight="400"
                            label={item.title}
                          />
                        </td>
                      </tr>
                    ) : item.radioInput ? (
                      <tr key={index}>
                        <td key={index} className="radio-option">
                          {item.radioInput.map((radioData, index) => (
                            <CustomRadio
                              key={index}
                              type="radio"
                              label={radioData.label}
                              name={radioData.name}
                              value={radioData.value}
                              onChange={handleAnionCheck}
                              checked={radioData.checked}
                              disabled={radioData.disabled}
                            />
                          ))}
                        </td>
                      </tr>
                    ) : (
                      <tr key={index}>
                        <td className="input-ref-text-wrapper">
                          <CustomInput
                            type="number"
                            isError={item.error}
                            isWarning={false}
                            defaultValue={item.defaultValue}
                            value={item.value}
                            name={item.name}
                            onChange={handleAnionChange}
                            disabled={item.disabled}
                            onBlur={(e) => handleAnionBlur(e)}
                          />
                          <InputReferenceText refText={item.refText} />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </StyledCard>
        {autoFocusValue && (
          <ProjectErrorPopup
            show={autoFocusValue}
            close={() => {
              setAutoFocusValue(false);
            }}
            message={message}
          />
        )}
      </AdvancedRegenerationStyled>
    </>
  );
};

export default AdvancedRegeneration;
