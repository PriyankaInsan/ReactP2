export const IXDUtility = (
  cationResin,
  anionResin,
  vessel1,
  vessel2,
  vessel3,
  vessel4,
  updateAdvCationObject,
  updateAdvAnionObject
) => {
  let updateObject = { ...updateAdvCationObject };
  let updateAnionObject = { ...updateAdvAnionObject };

  let actionForCation1 = null;
  let actionForAnion1 = null;
  let actionForCation2 = null;
  let actionForAnion2 = null;
  if (
    vessel1 !== null &&
    vessel2 === null &&
    vessel3 === null &&
    vessel4 === null
  ) {
    actionForCation1 = vessel1;
    actionForAnion1 = vessel1;
  } else if (
    vessel1 !== null &&
    vessel2 !== null &&
    vessel3 === null &&
    vessel4 === null
  ) {
    actionForCation1 = vessel1;
    actionForAnion1 = vessel2;
  } else if (
    cationResin === 5 &&
    anionResin !== 11 &&
    vessel1 !== null &&
    vessel2 !== null &&
    vessel3 !== null &&
    vessel4 === null
  ) {
    actionForCation1 = vessel1;
    actionForCation2 = vessel2;
    actionForAnion1 = vessel3;
  } else if (
    anionResin === 11 &&
    cationResin !== 5 &&
    vessel1 !== null &&
    vessel2 !== null &&
    vessel3 !== null &&
    vessel4 === null
  ) {
    actionForCation1 = vessel1;
    actionForCation2 = null;
    actionForAnion1 = vessel2;
    actionForAnion2 = vessel3;
  } else if (
    vessel1 !== null &&
    vessel2 !== null &&
    vessel3 !== null &&
    vessel4 !== null
  ) {
    actionForCation1 = vessel1;
    actionForCation2 = vessel2;
    actionForAnion1 = vessel3;
    actionForAnion2 = vessel4;
  }
  if (actionForCation1 === 0 && actionForCation2 === null) {
    updateObject = {
      ...updateAdvCationObject,
      ["compactionDuration"]: true,
      ["regenerationFactor"]: true,
      ["settingDuration"]: true,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["regenerationVelocity"]: false,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: false,
      ["fatRinseVolume"]: false,
    };
  } else if (actionForCation1 === 1 && actionForCation2 === null) {
    updateObject = {
      ...updateAdvCationObject,
      ["bwFrequency"]: true,
      ["bwExpansion"]: true,
      ["bwDuration"]: true,
      ["regenerationFactor"]: true,
      ["compactionDuration"]: false,
      ["regenerationVelocity"]: false,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: false,
      ["fatRinseVolume"]: false,
      ["settingDuration"]: false,
    };
  } else if (
    anionResin !== 10 &&
    cationResin !== 10 &&
    actionForCation1 === 2 &&
    actionForCation2 === null
  ) {
    updateObject = {
      ...updateAdvCationObject,
      ["bwFrequency"]: true,
      ["bwExpansion"]: true,
      ["bwDuration"]: true,
      ["compactionDuration"]: true,
      ["settingDuration"]: true,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: false,
      ["fatRinseVolume"]: false,
    };
  } else if (actionForCation1 === 4 && actionForCation2 === null) {
    updateObject = {
      ...updateAdvCationObject,
      ["regenerationFactor"]: true,
      ["compactionDuration"]: true,
      ["settingDuration"]: true,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["regenerationVelocity"]: false,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: false,
      ["fatRinseVolume"]: false,
    };
  } else if (actionForCation1 === 5 && actionForCation2 === null) {
    updateObject = {
      ...updateAdvCationObject,
      ["compactionDuration"]: true,
      ["settingDuration"]: true,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: false,
      ["fatRinseVolume"]: false,
    };
  } else if (actionForCation1 === 6 && actionForCation2 === null) {
    updateObject = {
      ...updateAdvCationObject,
      ["bwFrequency"]: true,
      ["bwExpansion"]: true,
      ["bwDuration"]: true,
      ["regenerationFactor"]: true,
      ["compactionDuration"]: false,
      ["regenerationVelocity"]: false,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: false,
      ["fatRinseVolume"]: false,
      ["settingDuration"]: false,
    };
  } else if (
    (actionForCation1 === 0 && actionForCation2 === 1) ||
    (actionForCation1 === 1 && actionForCation2 === 0)
  ) {
    updateObject = {
      ...updateAdvCationObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: false,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: false,
      ["fatRinseVolume"]: false,
      ["settingDuration"]: false,
    };
  } else if (
    (actionForCation1 === 0 && actionForCation2 === 2) ||
    (actionForCation1 === 2 && actionForCation2 === 0)
  ) {
    updateObject = {
      ...updateAdvCationObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: true,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: false,
      ["fatRinseVolume"]: false,
      ["settingDuration"]: true,
    };
  } else if (
    (actionForCation1 === 0 && actionForCation2 === 4) ||
    (actionForCation1 === 4 && actionForCation2 === 0)
  ) {
    updateObject = {
      ...updateAdvCationObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: true,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: false,
      ["fatRinseVolume"]: false,
      ["settingDuration"]: true,
    };
  } else if (
    (actionForCation1 === 0 && actionForCation2 === 5) ||
    (actionForCation1 === 5 && actionForCation2 === 0)
  ) {
    updateObject = {
      ...updateAdvCationObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: true,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: false,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: false,
      ["fatRinseVolume"]: false,
      ["settingDuration"]: true,
    };
  } else if (
    (actionForCation1 === 0 && actionForCation2 === 6) ||
    (actionForCation1 === 6 && actionForCation2 === 0)
  ) {
    updateObject = {
      ...updateAdvCationObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: false,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: false,
      ["fatRinseVolume"]: false,
      ["settingDuration"]: false,
    };
  } else if (
    anionResin === 10 &&
    cationResin === 10 &&
    actionForCation1 === 2
  ) {
    updateObject = {
      ...updateAdvCationObject,
      ["bwFrequency"]: true,
      ["bwExpansion"]: true,
      ["bwDuration"]: true,
      ["compactionDuration"]: true,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: false,
      ["fatRinseVolume"]: false,
      ["settingDuration"]: true,
    };
  } else if (anionResin === 9 && cationResin === 9 && actionForCation1 === 8) {
    updateObject = {
      ...updateAdvCationObject,
      ["bwFrequency"]: true,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: true,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: false,
      ["fatRinseVolume"]: false,
      ["settingDuration"]: true,
    };
  } else if (anionResin === 9 && cationResin === 9 && actionForCation1 === 9) {
    updateObject = {
      ...updateAdvCationObject,
      ["bwFrequency"]: true,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: true,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: false,
      ["fatRinseVolume"]: false,
      ["settingDuration"]: true,
    };
  }
  ////////////////////////////////////////////////
  if (actionForAnion1 === 0 && actionForAnion2 === null) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["compactionDuration"]: true,
      ["regenerationFactor"]: true,
      ["settingDuration"]: true,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["regenerationVelocity"]: false,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
    };
  } else if (actionForAnion1 === 1 && actionForAnion2 === null) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: true,
      ["bwExpansion"]: true,
      ["bwDuration"]: true,
      ["regenerationFactor"]: true,
      ["compactionDuration"]: false,
      ["regenerationVelocity"]: false,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: false,
    };
  } else if (
    anionResin !== 10 &&
    cationResin !== 10 &&
    actionForAnion1 === 2 &&
    actionForAnion2 === null
  ) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: true,
      ["bwExpansion"]: true,
      ["bwDuration"]: true,
      ["compactionDuration"]: true,
      ["settingDuration"]: true,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
    };
  } else if (actionForAnion1 === 4 && actionForAnion2 === null) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["regenerationFactor"]: true,
      ["compactionDuration"]: true,
      ["settingDuration"]: true,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["regenerationVelocity"]: false,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
    };
  } else if (actionForAnion1 === 5 && actionForAnion2 === null) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["compactionDuration"]: true,
      ["settingDuration"]: true,

      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: false,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
    };
  } else if (actionForAnion1 === 6 && actionForAnion2 === null) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: true,
      ["bwExpansion"]: true,
      ["bwDuration"]: true,
      ["regenerationFactor"]: true,
      ["compactionDuration"]: false,
      ["regenerationVelocity"]: false,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: false,
    };
  } else if (
    (actionForAnion1 === 0 && actionForAnion2 === 1) ||
    (actionForAnion1 === 1 && actionForAnion2 === 0)
  ) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: false,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: false,
    };
  } else if (
    (actionForAnion1 === 0 && actionForAnion2 === 2) ||
    (actionForAnion1 === 2 && actionForAnion2 === 0)
  ) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: true,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: true,
    };
  } else if (
    (actionForAnion1 === 0 && actionForAnion2 === 4) ||
    (actionForAnion1 === 4 && actionForAnion2 === 0)
  ) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: true,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: true,
    };
  } else if (
    (actionForAnion1 === 0 && actionForAnion2 === 5) ||
    (actionForAnion1 === 5 && actionForAnion2 === 0)
  ) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: true,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: false,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: true,
    };
  } else if (
    (actionForAnion1 === 0 && actionForAnion2 === 6) ||
    (actionForAnion1 === 6 && actionForAnion2 === 0)
  ) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: false,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: false,
    };
  } else if (
    (actionForAnion1 === 1 && actionForAnion2 === 2) ||
    (actionForAnion1 === 2 && actionForAnion2 === 1)
  ) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: true,
      ["bwExpansion"]: true,
      ["bwDuration"]: true,
      ["compactionDuration"]: false,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: false,
    };
  } else if (
    (actionForAnion1 === 1 && actionForAnion2 === 4) ||
    (actionForAnion1 === 4 && actionForAnion2 === 1)
  ) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: false,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: false,
    };
  } else if (
    (actionForAnion1 === 1 && actionForAnion2 === 5) ||
    (actionForAnion1 === 5 && actionForAnion2 === 1)
  ) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: false,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: false,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: false,
    };
  } else if (
    (actionForAnion1 === 1 && actionForAnion2 === 6) ||
    (actionForAnion1 === 6 && actionForAnion2 === 1)
  ) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: true,
      ["bwExpansion"]: true,
      ["bwDuration"]: true,
      ["compactionDuration"]: false,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: false,
    };
  } else if (
    (actionForAnion1 === 2 && actionForAnion2 === 4) ||
    (actionForAnion1 === 4 && actionForAnion2 === 2)
  ) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: true,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: true,
    };
  } else if (
    (actionForAnion1 === 2 && actionForAnion2 === 5) ||
    (actionForAnion1 === 5 && actionForAnion2 === 2)
  ) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: true,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: false,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: true,
    };
  } else if (
    (actionForAnion1 === 2 && actionForAnion2 === 6) ||
    (actionForAnion1 === 6 && actionForAnion2 === 2)
  ) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: true,
      ["bwExpansion"]: true,
      ["bwDuration"]: true,
      ["compactionDuration"]: false,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: true,
    };
  } else if (
    (actionForAnion1 === 4 && actionForAnion2 === 5) ||
    (actionForAnion1 === 5 && actionForAnion2 === 4)
  ) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: true,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: false,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: true,
    };
  } else if (
    (actionForAnion1 === 4 && actionForAnion2 === 6) ||
    (actionForAnion1 === 6 && actionForAnion2 === 4)
  ) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: false,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: false,
    };
  } else if (
    (actionForAnion1 === 5 && actionForAnion2 === 6) ||
    (actionForAnion1 === 6 && actionForAnion2 === 5)
  ) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: false,
      ["bwDuration"]: false,
      ["compactionDuration"]: false,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: false,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: false,
    };
  } else if (anionResin === 10 && cationResin === 10 && actionForAnion1 === 2) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: true,
      ["bwExpansion"]: true,
      ["bwDuration"]: true,
      ["compactionDuration"]: true,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: false,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: true,
    };
  } else if (anionResin === 9 && cationResin === 9 && actionForAnion1 === 9) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: true,
      ["bwDuration"]: true,
      ["compactionDuration"]: true,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: true,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: true,
    };
  } else if (anionResin === 9 && cationResin === 9 && actionForAnion1 === 8) {
    updateAnionObject = {
      ...updateAdvAnionObject,
      ["bwFrequency"]: false,
      ["bwExpansion"]: true,
      ["bwDuration"]: true,
      ["compactionDuration"]: true,
      ["regenerationVelocity"]: false,
      ["regenerationFactor"]: false,
      ["displacementFlow"]: false,
      ["displacementVolume"]: false,
      ["fatRinseRecycle"]: true,
      ["fatRinseVolume"]: true,
      ["settingDuration"]: true,
    };
  }
  return { updateObject: updateObject, updateAnionObject: updateAnionObject };
};
