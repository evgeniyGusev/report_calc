'use strict'
//план
const weight = Array.from(document.querySelectorAll('[data-weight]')); //массив кормов
const howWeightNeeds = document.querySelector('.input-how-weight'); //план
const totalPalletsNeeds = document.querySelector('.total-pallets-needs'); //Паллет
const totalStickersNeeds = document.querySelector('.total-stickers-needs'); //Этикеток
const totalPalletBtn = document.querySelector('.total-pallet-btn'); //Рассчитать
//списание
const palletsDone = document.querySelector('.pallets-done'); //Паллет сделано
const boxesDone = document.querySelector('.boxes-done'); //Коробок дополнительно
const writeOffBtn = document.querySelector('.write-off-btn'); //Рассчитать
const writeOffPieces = document.querySelector('.total-pieces'); //Всего пачек
const writeOffBoxes = document.querySelector('.write-off-boxes'); //Всего коробок
const writeOffTriang = document.querySelector('.write-off-triang'); //Всего уголков

class Petfood {
  constructor(weight, pib, bip) { //(вес одного пакета, пакетов в коробке, коробок на паллете)
    this.weight = weight;
    this.piecesInBox = pib;
    this.boxInPallet = bip
  }
  get palletWeight() {
    return this.weight * this.piecesInBox * this.boxInPallet;
  }
}

const foodsArr = [
  new Petfood(0.35, 18, 80),
  new Petfood(0.4, 16, 64),
  new Petfood(0.5, 12, 70),
  new Petfood(1, 6, 64),
  new Petfood(1.8, 6, 45),
  new Petfood(2, 6, 45),
  new Petfood(2.2, 5, 45),
  new Petfood(2.4, 3, 78),
  new Petfood(2.5, 4, 45),
  new Petfood(10, 1, 52),
  new Petfood(13, 1, 40),
  new Petfood(15, 1, 36),
  new Petfood(20, 1, 30),
];

const getFood = () => { //возвращает экземпляр Petfood выбранный в опшн
  const food = weight.filter(el => el.selected)[0].value;
  const petFood = foodsArr.filter(el => el.weight == food)[0];
  return petFood;
}

const getTotalPallets = () => { //рассчитывает необходимое кол-во паллетов и стикеров для выбранного опшн
  const foodPalletWeight = getFood().palletWeight;
  const needWeight = howWeightNeeds.value;
  const pallets = ((needWeight * 1000) / foodPalletWeight);

  totalPalletsNeeds.textContent = pallets.toFixed(2)
  totalStickersNeeds.textContent = (pallets * getFood().boxInPallet + 50).toFixed(0);
  howWeightNeeds.value = '';
}

const setTotalWriteOff = () => { //рассчитывает списание
  const boxes = palletsDone.value * getFood().boxInPallet + Number(boxesDone.value);

  writeOffBoxes.textContent = boxes;
  writeOffPieces.textContent = boxes * getFood().piecesInBox;
  writeOffTriang.textContent = boxesDone.value ? (Number(palletsDone.value) + 1) * 4 : palletsDone.value * 4;
}

totalPalletBtn.addEventListener('click', getTotalPallets);
writeOffBtn.addEventListener('click', setTotalWriteOff);
