import { useEffect, useState } from "react";

export type WeatherInfo = {
  humidity: number;
  location: string;
  pressure: number;
  sunset: number;
  temperature: number;
  weatherIcon: string;
  weatherType: string;
  windSpeed: number;
};

function getTime(date: Date): { readable: string; dateTime: string } {
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit", // HH
    minute: "2-digit", // MM
    dayPeriod: "short", // AM/PM
  };

  let readable = date.toLocaleTimeString(undefined, timeOptions);
  let dateTime = date.getHours() + ":" + date.getMinutes(); // 24-hour time for dateTime

  return { readable, dateTime };
}
export default function Weather({ searchTerm }: { searchTerm: string }) {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null);
  console.log("searchterm");
  console.log(searchTerm);

  useEffect(() => {
    const getWeatherInfo = async (): Promise<void> => {
      try {
        console.log(process.env.WEATHER_API_KEY);
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;

        let res = await fetch(url);
        let data = await res.json();

        const { main, name, sys, weather, wind } = data;

        const newWeatherInfo = {
          humidity: main.humidity,
          location: `${name}, ${sys.country}`,
          pressure: main.pressure,
          sunset: sys.sunset,
          temperature: main.temp,
          weatherIcon: weather[0].icon,
          weatherType: weather[0].main,
          windSpeed: wind.speed,
        };

        console.log(data);
        setWeatherInfo(newWeatherInfo);
      } catch (error) {
        console.log(error);
      }
    };

    getWeatherInfo();
  }, [searchTerm]);

  return (
    <>
      {weatherInfo && (
        <article className="forecast">
          <div className="main">
            <div className="info">
              <p className="conditions">
                Weather Condition: {weatherInfo.weatherType}
              </p>
            </div>
            <div className="temperature">
              {/* <img
             src={require(`../assets/openweathericons/${weatherIcon}.svg`)}
             alt=""
           /> */}
              <p>Temperature: {Math.round(weatherInfo.temperature)} degrees</p>
            </div>
          </div>
          <dl>
            <div className="additional-info">
              <p>
                Sunset time:{" "}
                <time dateTime={getTime(new Date(weatherInfo.sunset)).dateTime}>
                  {getTime(new Date(weatherInfo.sunset * 1000)).readable}
                </time>
              </p>
            </div>
          </dl>
        </article>
      )}
    </>
  );
}
