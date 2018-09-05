import { range, getDistance } from "../misc/utils";

const getClosestCity = ({
  dimension,
  matrix,
  lastCity,
  route
}: {
  matrix: number[][];
  route: number[];
  lastCity: number;
  dimension: number;
}) => {
  const allCities = () => range(dimension).map(index => index + 1);
  const cityNotInRoute = (city: number) => route.indexOf(city) === -1;

  const getDistanceFromLastCity = (toCity: number) => ({
    toCity,
    distance: getDistance({ c1: toCity, c2: lastCity, ldrMatrix: matrix })
  });

  const distanceAscending = (
    a: { distance: number },
    b: { distance: number }
  ) => a.distance - b.distance;

  const citiesSortedByClosest = allCities()
    .filter(cityNotInRoute)
    .map(getDistanceFromLastCity)
    .sort(distanceAscending);

  return citiesSortedByClosest[0];
};

export const oneHeadRoute = ({
  matrix,
  dimension
}: {
  matrix: number[][];
  dimension: number;
}) => {
  let route = [1];

  range(dimension).forEach(() => {
    const lastCity = route[route.length - 1];

    const nextCity = getClosestCity({ matrix, route, dimension, lastCity });
    if (nextCity) {
      route.push(nextCity.toCity);
    } else {
      route.push(1);
    }
  });

  return route;
};

export const twoHeadRoute = ({
  matrix,
  dimension
}: {
  matrix: number[][];
  dimension: number;
}) => {
  let route = [1];

  range(dimension).forEach(() => {
    const lastCityHead1 = route[0];
    const lastCityHead2 = route[route.length - 1];

    const nextCityHead1 = getClosestCity({
      matrix,
      route,
      dimension,
      lastCity: lastCityHead1
    });
    const nextCityHead2 = getClosestCity({
      matrix,
      route,
      dimension,
      lastCity: lastCityHead2
    });

    if (!nextCityHead1 && !nextCityHead2) {
      // último item da iteração
      // nunca há o caso de ter um e não ter o outro
      // porque os dois retornarão vazios só quando o filter
      // do getNextCity (que ignora a rota atual) chegar no final

      // lastCityHead1 é o primeiro do array
      // isso acontece na iteração final
      route.push(lastCityHead1);
    } else if (nextCityHead1.distance < nextCityHead2.distance) {
      // adiciona na frente do array
      route = [nextCityHead1.toCity, ...route];
    } else {
      // adiciona no fim do array
      route.push(nextCityHead2.toCity);
    }
  });

  return route;
};
