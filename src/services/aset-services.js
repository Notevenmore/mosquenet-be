import { prismaClient } from "../application/database.js";
import { createAsetSchema, deleteAsetSchema, updateAsetSchema } from "../validation/aset-validation.js";
import { getCategorySchema } from "../validation/pemasukan-validation.js";
import { validate } from "../validation/validation.js";
import mosqueServices from "./mosque-services.js";

const createAset = async (request) => {
  request = validate(createAsetSchema, request);
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId;
  }

  const saveAset = await prismaClient.assets.create({
    data: {
      name: request.name,
      amount: request.amount,
      condition: request.condition,
      unit: request.unit,
      masjid_id: masjidId
    }
  });

  if(saveAset) {
    return {
      message: "Aset Masjid berhasil didata",
      status: 200
    };
  } else {
    return {
      message: "Aset Masjid gagal tersimpan, coba lagi.",
      status: 400
    };
  }
} 

const getAset = async (request) => {
  request = validate(getCategorySchema, request);
  const masjidId = await mosqueServices.getMasjidId(request.user_id);
  if(masjidId.status) {
    return masjidId;
  }

  const assets = await prismaClient.assets.findMany({
    where: {
      masjid_id: masjidId
    },
    select: {
      id: true,
      name: true,
      amount: true,
      condition: true,
      unit: true
    }
  });

  if(assets) {
    return {
      message: "Aset masjid berhasil didapatkan",
      status: 200,
      assets: assets
    }
  } else {
    return {
      message: "Aset masjid gagal didapatkan",
      status: 500,
    }
  }
}

const updateAset = async (request) => {
  request = validate(updateAsetSchema, request);

  const updateAsset = await prismaClient.assets.update({
    where: {
      id: request.asset_id
    },
    data: {
      name: request.name,
      amount: request.amount,
      condition: request.condition,
      unit: request.unit
    }
  });

  if(updateAsset) {
    return {
      message: "Aset masjid berhasil diupdate.",
      status: 200,
    };
  } else {
    return {
      message: "Aset masjid gagal diupdate",
      status: 500
    };
  }
}

const deleteAset = async (request) => {
  request = validate(deleteAsetSchema, request);

  const deleteMosqueAset = await prismaClient.assets.delete({
    where: {
      id: request.asset_id
    }
  });

  if(deleteMosqueAset) {
    return {
      message: "Aset masjid berhasil dihapus",
      status: 200
    };
  } else {
    return {
      message: "Aset masjid gagal dihapus",
      status: 500
    };
  }
}

export default {
  createAset,
  getAset,
  updateAset,
  deleteAset
}