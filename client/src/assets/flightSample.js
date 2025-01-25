export const flightSample = {
    "AirlineCode": "6E",
    "AirlineRemark": "6E main.",
    "Fare": {
        "AdditionalTxnFeeOfrd": 0,
        "AdditionalTxnFeePub": 0,
        "BaseFare": 8786,
        "ChargeBU": [
            {
                "key": "TBOMARKUP",
                "value": 0
            },
            {
                "key": "GLOBALPROCUREMENTCHARGE",
                "value": 0
            },
            {
                "key": "CONVENIENCECHARGE",
                "value": 0
            },
            {
                "key": "OTHERCHARGE",
                "value": 0
            }
        ],
        "CommissionEarned": 0,
        "Currency": "INR",
        "Discount": 0,
        "IncentiveEarned": 0,
        "OfferedFare": 11104,
        "OtherCharges": 0,
        "PGCharge": 0,
        "PLBEarned": 0,
        "PublishedFare": 11104,
        "ServiceFee": 0,
        "Tax": 2318,
        "TaxBreakup": [
            {
                "key": "K3",
                "value": 0
            },
            {
                "key": "YQTax",
                "value": 0
            },
            {
                "key": "YR",
                "value": 0
            },
            {
                "key": "PSF",
                "value": 0
            },
            {
                "key": "UDF",
                "value": 0
            },
            {
                "key": "INTax",
                "value": 0
            },
            {
                "key": "TransactionFee",
                "value": 0
            },
            {
                "key": "OtherTaxes",
                "value": 0
            }
        ],
        "TdsOnCommission": 0,
        "TdsOnIncentive": 0,
        "TdsOnPLB": 0,
        "TotalBaggageCharges": 0,
        "TotalMealCharges": 0,
        "TotalSeatCharges": 0,
        "TotalSpecialServiceCharges": 0,
        "YQTax": 0
    },
    "FareBreakdown": [
        {
            "AdditionalTxnFeeOfrd": 0,
            "AdditionalTxnFeePub": 0,
            "BaseFare": 3518,
            "Currency": "INR",
            "PGCharge": 0,
            "PassengerCount": 1,
            "PassengerType": 1,
            "SupplierReissueCharges": 0,
            "Tax": 1159,
            "TaxBreakUp": null,
            "YQTax": 0
        },
        {
            "AdditionalTxnFeeOfrd": 0,
            "AdditionalTxnFeePub": 0,
            "BaseFare": 3518,
            "Currency": "INR",
            "PGCharge": 0,
            "PassengerCount": 1,
            "PassengerType": 2,
            "SupplierReissueCharges": 0,
            "Tax": 1159,
            "TaxBreakUp": null,
            "YQTax": 0
        },
        {
            "AdditionalTxnFeeOfrd": 0,
            "AdditionalTxnFeePub": 0,
            "BaseFare": 1750,
            "Currency": "INR",
            "PGCharge": 0,
            "PassengerCount": 1,
            "PassengerType": 3,
            "SupplierReissueCharges": 0,
            "Tax": 0,
            "TaxBreakUp": null,
            "YQTax": 0
        }
    ],
    "FareClassification": {
        "Color": "lightBlue",
        "Type": "Publish"
    },
    "FareRules": [
        {
            "Airline": "6E",
            "Destination": "CCU",
            "FareBasisCode": "RCIP",
            "FareFamilyCode": "",
            "FareRestriction": "",
            "FareRuleDetail": "",
            "FareRuleIndex": "",
            "Origin": "RPR"
        },
        {
            "Airline": "6E",
            "Destination": "BOM",
            "FareBasisCode": "RCIP",
            "FareFamilyCode": "",
            "FareRestriction": "",
            "FareRuleDetail": "",
            "FareRuleIndex": "",
            "Origin": "CCU"
        }
    ],
    "FirstNameFormat": null,
    "GSTAllowed": true,
    "IsBookableIfSeatNotAvailable": false,
    "IsCouponAppilcable": true,
    "IsGSTMandatory": false,
    "IsHoldAllowedWithSSR": false,
    "IsLCC": true,
    "IsPanRequiredAtBook": false,
    "IsPanRequiredAtTicket": false,
    "IsPassportFullDetailRequiredAtBook": false,
    "IsPassportRequiredAtBook": false,
    "IsPassportRequiredAtTicket": false,
    "IsRefundable": true,
    "LastNameFormat": null,
    "LastTicketDate": null,
    "MiniFareRules": [
        [
            {
                "Details": "INR 2999",
                "From": "0",
                "JourneyPoints": "RPR-CCU-BOM",
                "To": "3",
                "Type": "Reissue",
                "Unit": "DAYS"
            },
            {
                "Details": "INR 2250",
                "From": "4",
                "JourneyPoints": "RPR-CCU-BOM",
                "To": "",
                "Type": "Reissue",
                "Unit": "DAYS"
            },
            {
                "Details": "INR 3999",
                "From": "0",
                "JourneyPoints": "RPR-CCU-BOM",
                "To": "3",
                "Type": "Cancellation",
                "Unit": "DAYS"
            },
            {
                "Details": "INR 2999",
                "From": "4",
                "JourneyPoints": "RPR-CCU-BOM",
                "To": "",
                "Type": "Cancellation",
                "Unit": "DAYS"
            },
            {
                "Details": "Unchangeble",
                "From": "44",
                "JourneyPoints": "RPR-CCU-BOM",
                "To": "444",
                "Type": "Reissue",
                "Unit": "HOURS"
            }
        ]
    ],
    "ResultFareType": "RegularFare",
    "ResultIndex": "OB2[TBO]WvJXy5T+/ZynRzCUinmW6/+Pm0GJk8VfSmlEtxmtfw4ucHQBEMH6CdCFCjuLEwq/c7cvAm326uF9rM5YzgBu2gI59hNYk5Uq1qdAIqYlTPCvPayFX5vFHKaWEfuKDGbuglrcreebeRJHDEHHTjyf5gtWUFkO8OTUiThY/0/voWdUq4UNaS1nVKR5O4Kzel2M3b+2/tMUH125Aw0omRMfJ40yH1h2dD9y8aj96qMeryrEYHTpAUfYS5EpjUQrDq/rMl/PO38G6oe+qXQS/HgAtVXdIoc4ztpXcNXI1YHx3OqLp2Yb8WV7cFcjRPnqbfyCCPq9B2Zwq6S0EraFKuP3unMpZCOomUsp07P+EW5bexUiRelQ48QlO0ARlvAqEd59srA8alnAzgDNss+wN4moSbXncWrkd6J/J8SG6lPS5L5vECIw6z2/rgVFr9lxCwcC9rSZsolTrxGdvbYthZIDzvt1rztpTzN8h9fmpAyn0HUtKpmad14lC3yySfWSLkvlkIkuWSCJTjZS5OjzT2j4fL2bri5I3ZQa9u0L/GYcHirJEc81G+k/7voUDY9KqM0DaxDaLgBdjBeN0LNKQx12peUx7GjMyFSydgfW+j3VY+P5Wg6AZHSFjKt9rAzO+PjttirN6Bdt7GMPZYEms7ZMU2fhRqnRttEjxli9wtUaiwKRJTDgjjD73Br5lKeiillYLVg819MAXujzQGqqiPI/bgiYRxqnC76vgsWm7kVeKgc8n+qOOs/ydt9ynJO9PAqoK6Ol7V7J9hzVn+/7BdIzTg==",
    "Segments": [
        [
            {
                "Airline": {
                    "AirlineCode": "6E",
                    "AirlineName": "Trial",
                    "FareClass": "RR",
                    "FlightNumber": "669",
                    "OperatingCarrier": ""
                },
                "Baggage": "15 Kilograms",
                "CabinBaggage": "7 KG",
                "CabinClass": 2,
                "Craft": "320",
                "Destination": {
                    "Airport": {
                        "AirportCode": "CCU",
                        "AirportName": "Calcutta",
                        "CityCode": "CCU",
                        "CityName": "Kolkata",
                        "CountryCode": "IN",
                        "CountryName": "India",
                        "Terminal": ""
                    },
                    "ArrTime": "2025-01-30T10:20:00"
                },
                "Duration": 85,
                "FareClassification": {
                    "Type": "Publish"
                },
                "FlightInfoIndex": "",
                "FlightStatus": "Confirmed",
                "GroundTime": 0,
                "IsETicketEligible": true,
                "Mile": 0,
                "NoOfSeatAvailable": 3,
                "Origin": {
                    "Airport": {
                        "AirportCode": "RPR",
                        "AirportName": "Raipur",
                        "CityCode": "RPR",
                        "CityName": "Raipur",
                        "CountryCode": "IN",
                        "CountryName": "India",
                        "Terminal": ""
                    },
                    "DepTime": "2025-01-30T08:55:00"
                },
                "Remark": null,
                "SegmentIndicator": 1,
                "Status": "",
                "StopOver": false,
                "StopPoint": "",
                "StopPointArrivalTime": "0001-01-01T00:00:00",
                "StopPointDepartureTime": "0001-01-01T00:00:00",
                "SupplierFareClass": null,
                "TripIndicator": 1
            },
            {
                "AccumulatedDuration": 460,
                "Airline": {
                    "AirlineCode": "6E",
                    "AirlineName": "Indigo",
                    "FareClass": "RR",
                    "FlightNumber": "5227",
                    "OperatingCarrier": ""
                },
                "Baggage": "15 Kilograms",
                "CabinBaggage": "7 KG",
                "CabinClass": 2,
                "Craft": "321",
                "Destination": {
                    "Airport": {
                        "AirportCode": "BOM",
                        "AirportName": "Chhatrapati Shivaji Maharaj International Airport",
                        "CityCode": "BOM",
                        "CityName": "Mumbai",
                        "CountryCode": "IN",
                        "CountryName": "India",
                        "Terminal": "1"
                    },
                    "ArrTime": "2025-01-30T16:35:00"
                },
                "Duration": 185,
                "FareClassification": {
                    "Type": "Publish"
                },
                "FlightInfoIndex": "",
                "FlightStatus": "Confirmed",
                "GroundTime": 190,
                "IsETicketEligible": true,
                "Mile": 0,
                "NoOfSeatAvailable": 3,
                "Origin": {
                    "Airport": {
                        "AirportCode": "CCU",
                        "AirportName": "Calcutta",
                        "CityCode": "CCU",
                        "CityName": "Kolkata",
                        "CountryCode": "IN",
                        "CountryName": "India",
                        "Terminal": ""
                    },
                    "DepTime": "2025-01-30T13:30:00"
                },
                "Remark": null,
                "SegmentIndicator": 2,
                "Status": "",
                "StopOver": false,
                "StopPoint": "",
                "StopPointArrivalTime": "0001-01-01T00:00:00",
                "StopPointDepartureTime": "0001-01-01T00:00:00",
                "SupplierFareClass": null,
                "TripIndicator": 1
            }
        ]
    ],
    "Source": 6,
    "TicketAdvisory": null,
    "ValidatingAirline": "6E"
}