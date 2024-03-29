class AddressController{
    constructor(
        addressRepo,
        clientErrors,
        addressValidator,
        nanoid
    ) {
        this.addressRepo = addressRepo;
        this.clientErrors = clientErrors;
        this.addressValidator = addressValidator;
        this.nanoid = nanoid;
    }

    // POST: "" && need middleware to validate if user is logged in
    createAddress = async(req, res, next) => {
        try {
            let {
                userID,
                userFullName,
                userNum,
                latitude,
                longitude,
                city,
                country,
                district,
                isoCountryCode,
                name,
                postalCode,
                region,
                street,
                streetNumber,
                subRegion,
                timeZone,
                isDefault
            } = req.body;

            // TODO: Validations
                // Validate if necessary fields are not null
            this.addressValidator.validateCreatePayload(req.body, ['userID', 'userFullName', 'userNum', 'latitude', 'longitude', 'isDefault']);
                // Validate if userID exists in database
            await this.addressValidator.validateExistence(userID, 'user');
                
            let addressID = this.nanoid(14);

            await this.addressRepo.createAddress(
                addressID,
                userID,
                userFullName,
                userNum,
                latitude,
                longitude,
                city,
                country,
                district,
                isoCountryCode,
                name,
                postalCode,
                region,
                street,
                streetNumber,
                subRegion,
                timeZone,
                isDefault
            );

            if (isDefault == 1) {
                await this.addressRepo.setAddressDefault(addressID, userID);
            }

            let newAddress = {
                ...req.body
            }
            newAddress.addressID = addressID;

            res.status(201).json({
                message: 'Address created successfully',
                body: newAddress
            });
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };

    // PATCH: "/:addressID" && need middleware to validate if user is logged in
    patchAddress = async(req, res, next) => {
        try {
            let {
                userID,
                userFullName,
                userNum,
                latitude,
                longitude,
                city,
                country,
                district,
                isoCountryCode,
                name,
                postalCode,
                region,
                street,
                streetNumber,
                subRegion,
                timeZone,
                isDefault
            } = req.body;

            let { addressID } = req.params;

            // TODO: Validations
                // Validate if addressID is not null
            this.addressValidator.checkRequiredParameters(req.params, ['addressID']);
            // Validate if addressID exists in database
            await this.addressValidator.validateExistence(addressID, 'address');
                // Validate if payload is not empty
            this.addressValidator.validatePatchPayload(req.body);

            userID != null && await this.addressValidator.validateExistence(userID, 'user');
            
            await this.addressRepo.patchAddress(
                addressID,
                userID,
                userFullName,
                userNum,
                latitude,
                longitude,
                city,
                country,
                district,
                isoCountryCode,
                name,
                postalCode,
                region,
                street,
                streetNumber,
                subRegion,
                timeZone,
                isDefault
            );

            if (isDefault == 1) {
                await this.addressRepo.setAddressDefault(addressID, userID);
            }

            let updatedAddress = {
                ...req.body
            }
            updatedAddress.addressID = addressID;

            res.status(200).json({
                message: 'Address updated successfully',
                body: updatedAddress
            });
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };
    
    // DELETE: "/:addressID" && need middleware to validate if user is logged in
    deleteAddress = async(req, res, next) => {
        try {
            let { addressID } = req.params;

            // TODO: Validations
                // Validate if addressID is not null
            this.addressValidator.checkRequiredParameters(req.params, ['addressID']);
                // Validate if addressID exists in database
            await this.addressValidator.validateExistence(addressID, 'address');

            await this.addressRepo.deleteAddress(addressID);

            res.status(204)
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };

    // GET: ""
    getAllAddress = async(req, res, next) => {
        try {
            let addresses = await this.addressRepo.getAllAddress();

            res.status(200).json({
                message: 'Addresses retrieved successfully',
                body: addresses
            });
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };

    // GET: "/user/:userID"
    getAllAddressOfUser = async(req, res, next) => {
        try {
            let { userID } = req.params;

            // TODO: Validations
                // Validate if userID is not null
            this.addressValidator.checkRequiredParameters(req.params, ['userID']);
                // Validate if userID exists in database
            await this.addressValidator.validateExistence(userID, 'user');

            let addresses = await this.addressRepo.getAllAddressOfUser(userID);

            res.status(200).json({
                message: `Addresses of user ${userID} retrieved successfully`,
                body: addresses
            });
        } catch (error) { 
            //TODO: Handle error
            next(error);
        }
    };

    // GET: "/:addressID"
    getAddressByID = async(req, res, next) => {
        try {
            let { addressID } = req.params;

            // TODO: Pre-query Validations
                // Validate if addressID is not null
            this.addressValidator.checkRequiredParameters(req.params, ['addressID']);
                
            let address = await this.addressRepo.getAddressByID(addressID);

            // TODO: Post-query Validations
                // Validate if addressID exists in database
            if (address == null) {
                throw new this.clientErrors.Api404Error(`Address with ID ${addressID} does not exist`);
            }

            res.status(200).json({
                message: 'Address retrieved successfully',
                body: address
            });
        } catch (error) {
            //TODO: Handle error
            next(error);
        }
    };

    // GET: "/default/providers"
    getAllDefaultProviderAddress = async(req, res, next) => {
        try {
            let addresses = await this.addressRepo.getAllDefaultProviderAddress();

            res.status(200).json({
                message: 'Default provider addresses retrieved successfully',
                body: addresses
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };

    // GET: "/default/seekers"
    getAllDefaultSeekerAddress = async(req, res, next) => {
        try {
            let addresses = await this.addressRepo.getAllDefaultSeekerAddress();

            res.status(200).json({
                message: 'Default seeker addresses retrieved successfully',
                body: addresses
            });
        } catch (error) {
            // TODO: Handle error
            next(error);
        }
    };
}

module.exports = AddressController;