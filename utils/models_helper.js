import {modelGetAllAPI} from "./API/models_api";

export function find_model_by_name(name, models) {
  for (let i = 0; i < models.length; i++) {
    if (models[i].label == name) {
      return models[i];
    }
  }
  return null;
}

export function find_model_by_id(id, models) {
  for (let i = 0; i < models.length; i++) {
    if (models[i].value == id) {
      return models[i];
    }
  }
  return null;
}

export function updateModel(model_id, setConversation, conversation, models) {
  console.log(model_id)
  let model_tmp = find_model_by_id(model_id, models);
  setConversation({
    ...conversation,
    model: model_tmp.label,
  });
}


export async function getModels(setModels) {
  const json = await modelGetAllAPI();
  if (json["code"] == "200") {
    let tmp = json["response"];
    let mdl = [];
    for (let i = 0; i < tmp.length; i++) {
      mdl.push({
        value: tmp[i]["_id"],
        label: tmp[i]["name"],
        description: tmp[i]["description"],
      });
    }
    setModels(mdl);
  }
}
