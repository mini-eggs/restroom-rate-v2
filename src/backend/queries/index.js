export var nearby = ({ lat, lng, distance }) => `
    SELECT *, (
        6371 * acos (
            cos ( radians(${lat}) )
            * cos( radians( lat ) )
            * cos( radians( lng ) - radians(${lng}) )
            + sin ( radians(${lat}) )
            * sin( radians( lat ) )
        )
    ) AS distance
    FROM rates HAVING distance < ${distance}
`;
