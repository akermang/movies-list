const isNotEmptyString = (str) => str !== "" && typeof (str) === "string";

const yearValidation = (year) => {
    const current_year = new Date().getFullYear();
    if (year / year !== 1) {
        return "Year is not proper. Please Enter Numeric Values Only";
    }
    if (year.toString().length !== 4) {
        return "Year should be 4 digit like: `2016`. Please check";
    }

    if ((year < 1920) || (year > current_year)) {
        return `Year should be in between 1920 to.. ${current_year}`;
    }
}

const isTitleValid = ({ Title, imdbID }, list) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].Title === Title && list[i].imdbID !== imdbID) {
            return "same movie title is already exist"
        }
    }
}

export const validData = (obj, list) => {
    for (let key in obj) {
        if (!isNotEmptyString(obj[key])) {
            return `please fill in the ${key} field`
        }
    }

    let yearErr = yearValidation(obj.Year);
    if (yearErr) {
        return yearErr
    }

    let titleErr = isTitleValid(obj, list);
    if (titleErr) {
        return titleErr
    }
    return true
}

export const formatTitle = title => {
    return title.toLowerCase().split(" ")
        .map(str => str.charAt(0)
            .toUpperCase() + str.slice(1)
                .replace(/[^a-zA-Z ]/g, ""))
        .join(" ");
}

export const isMovieEdited = (movie, editMovie) => {
    const keys = Object.keys(movie);
    for (let i = 0; i < keys.length; i++) {
        if (movie[keys[i]] !== editMovie[keys[i]]) return true
    }
    return false;
}



