const dateElement = document.getElementById('date')
const citiesSelectElement = document.getElementById('cities_select')
const cityNameElement = document.getElementById('city_name')

let cities = [

    {

        arabicName: 'بغداد',
        name: 'Baghdād'
    },
    {

        arabicName: 'البصرة',
        name: 'Al Başrah'
    },
    {

        arabicName: 'دهوك',
        name: 'Dihok'
    },
]

for (let city of cities) {

    const content = `

        <option>${city.arabicName}</option>
    `

    citiesSelectElement.innerHTML += content
}

citiesSelectElement.addEventListener('change', function() {

    cityNameElement.innerHTML = citiesSelectElement.value

    let cityName = ''

    for (let city of cities) {

        if (city.arabicName == this.value) {

            cityName = city.name
        }
    }

    getPrayersTime(cityName)
})


function getPrayersTime(cityName) {

    let param = {

        country: "IQ",
        city: cityName
    }

    axios.get('http://api.aladhan.com/v1/timingsByCity', {

        params: param
    
    }).then(function(response) {
    
        const timings = response.data.data.timings
    
        fillPrayerTime('fajr_time', timings.Fajr)
        fillPrayerTime('sunrise_time', timings.Sunrise)
        fillPrayerTime('dhurh_time', timings.Dhuhr)
        fillPrayerTime('asr_time', timings.Asr)
        fillPrayerTime('sunset_time', timings.Sunset)
        fillPrayerTime('isha_time', timings.Isha)
    
        const readableDate = response.data.data.date.readable
        const weekDay = response.data.data.date.hijri.weekday.ar
    
        const date = weekDay + " " + readableDate
    
        dateElement.innerHTML = date
    
    }).then(function(error) {
    
        console.log(error)
    })
}

function fillPrayerTime(id, time) {

    document.getElementById(id).innerHTML = time
}


getPrayersTime('Baghdād')