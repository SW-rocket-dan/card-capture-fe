import { NextResponse } from 'next/server';

export const GET = async () => {
  const STICKERS: string[] = [
    'dbbdf3b3-b591-4fd8-8dd0-92c4442c285b_removed-Apple-ba2030f8-413d-11ef-b9fd-0242ac1c000c.png.png',
    '3ed4e0a9-6c6e-4d15-bd62-bb1f71aa495e_removed-Apple-27f6cd3e-413f-11ef-b9fd-0242ac1c000c.png.png',
    'a2f06528-2ca6-430d-9b30-bce934806e73_removed-Banana-344b0d52-413f-11ef-b9fd-0242ac1c000c.png.png',
    '26081d77-bffc-4537-9ee9-cfccdc3cb2bd_removed-Cherry-4173b0d8-413f-11ef-b9fd-0242ac1c000c.png.png',
    'cfda616c-4b3f-4ae5-8a98-0d8e28336fdd_removed-Date-4e475d64-413f-11ef-b9fd-0242ac1c000c.png.png',
    'e1b578a7-f00e-436d-ad97-684aa6149c8f_removed-Fig-69777af6-413f-11ef-b9fd-0242ac1c000c.png.png',
    '2fb65a21-3369-4c12-b30e-88ff119c89e1_removed-Grape-788f8916-413f-11ef-b9fd-0242ac1c000c.png.png',
    '274f540c-343d-46be-9e52-d1971c82472a_removed-Honeydew-8624c078-413f-11ef-b9fd-0242ac1c000c.png.png',
    '1d182115-35f5-42e2-9191-8fad6db8b594_removed-Ivy_Gourd-924786f6-413f-11ef-b9fd-0242ac1c000c.png.png',
    '9092ee00-3152-47da-a694-e0c789dcb67c_removed-Jackfruit-a09f215a-413f-11ef-b9fd-0242ac1c000c.png.png',
    '68c00a62-cbe5-4cba-9e71-1ae4d3fec6e9_removed-Kiwi-aefb116e-413f-11ef-b9fd-0242ac1c000c.png.png',
    '60d1f4bf-8e4a-454e-b76b-e3eed07c4b09_removed-Lemon-bdf46f80-413f-11ef-b9fd-0242ac1c000c.png.png',
    '968ce5f0-bb09-404a-b138-eec75e7a2c6b_removed-Mango-c92acd40-413f-11ef-b9fd-0242ac1c000c.png.png',
    '73e56a1b-1582-494c-bb08-80c37a98a9f7_removed-Nectarine-d659af7c-413f-11ef-b9fd-0242ac1c000c.png.png',
    'b1faa55b-c18c-48e4-acb1-169c7e2d773f_removed-Orange-e4137e2c-413f-11ef-b9fd-0242ac1c000c.png.png',
    '4ef71796-0a2e-42c5-975b-922d4faa7e9d_removed-Papaya-f254f2f4-413f-11ef-b9fd-0242ac1c000c.png.png',
    '10ea4e26-c67e-41ba-80bb-5b5cfaedfa0a_removed-Quince-ffb19eb6-413f-11ef-b9fd-0242ac1c000c.png.png',
    '48eeabaa-4a9f-4e93-a7fe-592d1543d88d_removed-Raspberry-0f60290e-4140-11ef-b9fd-0242ac1c000c.png.png',
    '9e39695f-07dd-424f-b66d-cc109083b5f9_removed-Strawberry-1c85d156-4140-11ef-b9fd-0242ac1c000c.png.png',
    '11b90e22-a718-4ef4-aa3f-3da2fe2cbde9_removed-Tomato-28188cac-4140-11ef-b9fd-0242ac1c000c.png.png',
    'c2a4d27b-a614-4f37-8f0d-8494c579586d_removed-Ugli_Fruit-35c2f9d2-4140-11ef-b9fd-0242ac1c000c.png.png',
    'ce217543-51d8-4ccf-ad6d-13e7143225dc_removed-Apple-48c51e8e-4140-11ef-b9fd-0242ac1c000c.png.png',
    'be99093b-7f97-48cd-91ae-5d856d9e0cf8_removed-Banana-568164f6-4140-11ef-b9fd-0242ac1c000c.png.png',
    '568061bb-7c45-4b41-9750-4bafc85fbede_removed-Cherry-62d62368-4140-11ef-b9fd-0242ac1c000c.png.png',
    '328980c5-311f-4f04-a9eb-371c29a7b34e_removed-Apple-ad57353a-4140-11ef-b9fd-0242ac1c000c.png.png',
    'a4208c49-9f98-43ea-b7d8-38d3481b85ba_removed-%EA%B3%A0%EC%96%91%EC%9D%B4-89e790e6-4379-11ef-a948-0242ac1c000c.png.png',
    '8b115fae-a422-42d6-9b9f-f680d339a7aa_removed-%EA%B0%95%EC%95%84%EC%A7%80-9baf2546-4379-11ef-a948-0242ac1c000c.png.png',
    'dcb8c54e-4e03-48ec-88af-225a84643edb_removed-%EA%BD%83-a96a7690-4379-11ef-a948-0242ac1c000c.png.png',
    '622a788d-c4cf-4f68-b532-c1c68f7d6c0e_removed-%ED%95%98%ED%8A%B8-b7cce4b6-4379-11ef-a948-0242ac1c000c.png.png',
    '53a965ab-06be-4787-a603-869756ab0c3a_removed-%EB%B3%84-c392f6c8-4379-11ef-a948-0242ac1c000c.png.png',
    '8dad34fd-06e9-4931-a930-24f8b9dc3722_removed-%EC%BC%80%EC%9D%B4%ED%81%AC-d0effe88-4379-11ef-a948-0242ac1c000c.png.png',
    'd9a9bc44-47cc-493b-a743-bf95c9d82061_removed-%ED%92%8D%EC%84%A0-df597fe4-4379-11ef-a948-0242ac1c000c.png.png',
    '708dd5d7-e3b0-4f3f-a1de-8b86f8028631_removed-%EC%84%A0%EB%AC%BC-ed2b6d26-4379-11ef-a948-0242ac1c000c.png.png',
    '6f8b0187-5df6-428a-8e4e-ce26e20fe7f4_removed-%EB%AC%B4%EC%A7%80%EA%B0%9C-fa322456-4379-11ef-a948-0242ac1c000c.png.png',
    'b335ca13-964a-479b-a901-29354ac1bc13_removed-%ED%96%87%EC%82%B4-08b58252-437a-11ef-a948-0242ac1c000c.png.png',
    '822609c1-9fad-4c0e-af88-887f7fdbf344_removed-%EB%8B%AC-18bb597e-437a-11ef-a948-0242ac1c000c.png.png',
    '218b870a-a59a-4272-90bf-2d37c2cf663c_removed-%EA%B5%AC%EB%A6%84-26bca5dc-437a-11ef-a948-0242ac1c000c.png.png',
    '4880d83b-bd84-4267-bbdb-58e252abc33c_removed-%EC%9E%90%EB%8F%99%EC%B0%A8-33fc25ec-437a-11ef-a948-0242ac1c000c.png.png',
    'fa59c498-2a8d-41d2-80c3-4ce9fd94ff3d_removed-Apple-2ace269a-437b-11ef-a948-0242ac1c000c.png.png',
    '5df1299c-e0ba-4d33-9af0-070961cccdea_removed-Apple-20404e64-437c-11ef-a948-0242ac1c000c.png.png',
    '90afd4d8-4f6e-4f13-bd8b-c274d6710945_removed-Cat-b79bf9e8-437c-11ef-a948-0242ac1c000c.png.png',
    '8d3b9ee3-f669-4187-a37b-55e99787ef04_removed-Dog-c58be72a-437c-11ef-a948-0242ac1c000c.png.png',
    '1699c449-11dc-4e95-95b6-0a5c92f53ece_removed-Flower-d3880f3e-437c-11ef-a948-0242ac1c000c.png.png',
    '16e063a9-bf34-43ff-bd56-3c36ab88d4bb_removed-Heart-e181d55c-437c-11ef-a948-0242ac1c000c.png.png',
    '8faa7416-9730-4571-9d3b-4c2af96f70bf_removed-Star-ee4b07ae-437c-11ef-a948-0242ac1c000c.png.png',
    'dcd77e10-a318-4583-9632-5b0dab4051df_removed-Cake-fe000d7a-437c-11ef-a948-0242ac1c000c.png.png',
    '6727c3bc-d73e-416f-a86c-e3565a97cabd_removed-Balloon-0f5dd12e-437d-11ef-a948-0242ac1c000c.png.png',
    'a42dfe31-95a2-4026-a960-647586274ddd_removed-Gift-1cf68d6c-437d-11ef-a948-0242ac1c000c.png.png',
    '4a3ecfd5-20be-4bb6-ae32-cb66f3ce4346_removed-Apple-4157603c-437d-11ef-a948-0242ac1c000c.png.png',
    'cdabe351-ebc5-4085-8b86-1425d5a3181a_removed-Apple-566451e2-437d-11ef-a948-0242ac1c000c.png.png',
    '8b06d2d9-e40b-49aa-aaac-e78e51ed063e_removed-Cat-6bfeb948-437d-11ef-a948-0242ac1c000c.png.png',
    'f2d6c39b-650c-473a-8dc3-37e296a3f2d9_removed-Dog-7ca0a928-437d-11ef-a948-0242ac1c000c.png.png',
    '7d505596-cf75-435b-9fe4-eba1cfe4265c_removed-Cat-b0136804-437d-11ef-8e40-0242ac1c000c.png.png',
    '7ddd9959-57c2-4e91-b913-634108ca5b91_removed-Dog-c0b134e8-437d-11ef-8e40-0242ac1c000c.png.png',
    '6958c350-94bb-4968-9692-4519ac40b050_removed-Flower-d21ac776-437d-11ef-8e40-0242ac1c000c.png.png',
    '632b28ee-a39f-4cb4-92c6-b04314044e68_removed-Cat-3404de52-4380-11ef-8e40-0242ac1c000c.png.png',
    '63c1c747-b618-464e-b6f7-b9942e2b9be2_removed-Dog-4706b188-4380-11ef-8e40-0242ac1c000c.png.png',
    'dec5c507-4670-4f1d-b073-49c0c798f7e2_removed-Flower-57ba3770-4380-11ef-8e40-0242ac1c000c.png.png',
    '7d37f83c-b106-4947-b27b-b3236c240ff9_removed-Cat-70976d76-4380-11ef-8e40-0242ac1c000c.png.png',
    '68b1aa65-8024-4045-81f9-3db88e8def8f_removed-Dog-80d92030-4380-11ef-8e40-0242ac1c000c.png.png',
    'bb09f79c-4306-4875-bb87-d09bb1590cba_removed-Flower-8ed7ab2a-4380-11ef-8e40-0242ac1c000c.png.png',
    'b40b6d2a-0450-4dd1-860f-e12d12102e01_removed-Heart-9d886e70-4380-11ef-8e40-0242ac1c000c.png.png',
    'dc5d8343-9a70-4ff6-aeef-cf8b1e358db0_removed-Star-af6a7fd4-4380-11ef-8e40-0242ac1c000c.png.png',
    'c3cfa457-b107-41cf-85a6-cb96f0ce62b9_removed-Cake-bda0416a-4380-11ef-8e40-0242ac1c000c.png.png',
    '35803b0b-52a4-4a51-a6fe-a9cdb3a70b32_removed-Balloon-cdbbe2ac-4380-11ef-8e40-0242ac1c000c.png.png',
    'f8519edb-3979-445d-8df1-6827bb3ec1e6_removed-Gift-dfbf23ec-4380-11ef-8e40-0242ac1c000c.png.png',
    '1507e5a3-dc0b-422f-b1ba-dabcdb75ef92_removed-Rainbow-ee3a5eaa-4380-11ef-8e40-0242ac1c000c.png.png',
    'b051ed52-3c61-4dc7-b239-a4aee19fc909_removed-Sunshine-fe65db60-4380-11ef-8e40-0242ac1c000c.png.png',
    '3622398e-c872-4a99-961d-c843b32e4a01_removed-Moon-0eb88652-4381-11ef-8e40-0242ac1c000c.png.png',
    'bb8ae64f-7f43-45c7-92e9-407efe994f31_removed-Cloud-1eaf9758-4381-11ef-8e40-0242ac1c000c.png.png',
    '0dc0bac6-1ac9-4cec-b9f3-39491edbc7a9_removed-Car-2d98a3d6-4381-11ef-8e40-0242ac1c000c.png.png',
    '2d5a4c95-6d91-4b51-9f98-df5dbe09223f_removed-Airplane-3c58d882-4381-11ef-8e40-0242ac1c000c.png.png',
    'f4a22fea-761f-460b-8694-593bbcb46ce5_removed-Boat-4bb1adf4-4381-11ef-8e40-0242ac1c000c.png.png',
    '34b6c439-fcd6-429a-b7f0-34dda940ab3d_removed-Train-5cd6ef04-4381-11ef-8e40-0242ac1c000c.png.png',
    '8a1005f5-e5d5-4ea7-a93f-997fbbfb2db5_removed-Mountain-6cecf6d6-4381-11ef-8e40-0242ac1c000c.png.png',
    '95d1eec1-8efd-4e3f-9fb3-4a82a93dc559_removed-Tree-7b2765ec-4381-11ef-8e40-0242ac1c000c.png.png',
    'fd56b390-8e13-47d7-a020-0c20d9a4d5d6_removed-Beach-8ae02294-4381-11ef-8e40-0242ac1c000c.png.png',
    'e2d9105e-fa53-4ba8-adac-f4b475ab1de2_removed-Sea-9bfaaacc-4381-11ef-8e40-0242ac1c000c.png.png',
    '15c4f16b-07cc-4048-b402-91e009416493_removed-Cat-db5b716a-4381-11ef-8e40-0242ac1c000c.png.png',
    'be6e6cbb-202a-4433-ac74-67aed7aee9bc_removed-Dog-ea4a5b3c-4381-11ef-8e40-0242ac1c000c.png.png',
    '9d3156fc-4c26-42d6-923b-9f7d2bda2ca3_removed-Flower-f9870082-4381-11ef-8e40-0242ac1c000c.png.png',
    'c1af51b6-7407-405f-8c06-c10e37f79440_removed-Cat-12e40ca0-4382-11ef-8e40-0242ac1c000c.png.png',
    'fd690c47-c059-4578-a9a2-9867363bb27e_removed-Dog-2159e7b4-4382-11ef-8e40-0242ac1c000c.png.png',
    'abd8e60d-5c34-4e14-9183-430b9ecb40e6_removed-Flower-3175b43e-4382-11ef-8e40-0242ac1c000c.png.png',
    'd95b1a72-842b-439d-bc65-64875095fc88_removed-Heart-4233f448-4382-11ef-8e40-0242ac1c000c.png.png',
    'bc54395c-2a25-45fa-9fae-0e35eb16159f_removed-Star-51cb1198-4382-11ef-8e40-0242ac1c000c.png.png',
    '9a02e73d-77e5-466b-b175-94bbcd6e87ca_removed-Cake-61d749b2-4382-11ef-8e40-0242ac1c000c.png.png',
    '5b4d079a-3be6-44d5-b07b-c1654c7f66a6_removed-Balloon-72c9c74a-4382-11ef-8e40-0242ac1c000c.png.png',
    '7348334e-3599-4200-8050-8161e735b1a9_removed-Gift-7fc99b32-4382-11ef-8e40-0242ac1c000c.png.png',
    '9d6c49fd-384d-412a-962d-10a4fcb660f0_removed-Cat-9c127476-4382-11ef-8e40-0242ac1c000c.png.png',
    '87a06334-78b3-4584-9b1a-e6be1d5d5e10_removed-Dog-ab54cc86-4382-11ef-8e40-0242ac1c000c.png.png',
    '3f72064c-c7d0-46b8-bb1f-16ea8a8072ef_removed-Flower-bbabc5f8-4382-11ef-8e40-0242ac1c000c.png.png',
    'a29de75c-c771-4bf6-be37-864fcc1695a2_removed-Heart-cd325792-4382-11ef-8e40-0242ac1c000c.png.png',
    'b2cbdb91-f49c-43df-82db-b1643b796417_removed-Star-dc2d09e0-4382-11ef-8e40-0242ac1c000c.png.png',
    'ccd38165-f5d7-4d48-82af-1a37fee0e6ee_removed-Cake-ec3fb210-4382-11ef-8e40-0242ac1c000c.png.png',
    'e0fdef0b-85e9-4e65-878d-29a81f0a486c_removed-Balloon-fc810516-4382-11ef-8e40-0242ac1c000c.png.png',
    'ca5fe665-dfca-4b03-8ccd-4cefd5f3fb8b_removed-Gift-0e1d50fe-4383-11ef-8e40-0242ac1c000c.png.png',
    '42c53e47-0c58-4ebf-9d98-0c26ef96d548_removed-Rainbow-1e6d4b8a-4383-11ef-8e40-0242ac1c000c.png.png',
    '97dd88b4-7e15-4a9d-a09c-0c3346a02d1a_removed-Sunshine-2c75ede0-4383-11ef-8e40-0242ac1c000c.png.png',
    '2156d0af-1671-4b8f-8728-39e048514f5c_removed-Moon-3bf9deb6-4383-11ef-8e40-0242ac1c000c.png.png',
    'f19a73ed-4001-4f5a-bddc-b19c739f24d9_removed-Cloud-4c2edebc-4383-11ef-8e40-0242ac1c000c.png.png',
    '5cdf42fa-0a5c-459b-9fbc-0cd6cb0f9d6b_removed-Car-5c89c7fe-4383-11ef-8e40-0242ac1c000c.png.png',
    '667f9daa-c87c-492c-aa66-85bdc1700b11_removed-Airplane-6eb347c0-4383-11ef-8e40-0242ac1c000c.png.png',
    'a563f610-5d06-4791-bce8-50c5887f546e_removed-Boat-7f55b46e-4383-11ef-8e40-0242ac1c000c.png.png',
    '89a5b16a-e7a1-46cb-af06-0e643dd84945_removed-Train-8f8c0752-4383-11ef-8e40-0242ac1c000c.png.png',
    '57339de7-6c6d-40ee-9650-0585e0fd4d95_removed-Mountain-a05559a8-4383-11ef-8e40-0242ac1c000c.png.png',
    '8be3b283-23cf-49c7-86a5-59d6397ea81b_removed-Tree-b03ea144-4383-11ef-8e40-0242ac1c000c.png.png',
    'ed05fc2a-3467-426f-88f6-6e955aed6394_removed-Beach-c4073614-4383-11ef-8e40-0242ac1c000c.png.png',
    '5e5c6acd-f416-4880-8a53-857681f3abe6_removed-Sea-d5d93af4-4383-11ef-8e40-0242ac1c000c.png.png',
    'f5913d4a-51af-4c23-807f-35c63511c85a_removed-Book-ea102ab4-4383-11ef-8e40-0242ac1c000c.png.png',
    '6981f4a7-8844-4e9a-abae-ebe77df78c45_removed-Instrument-fa694b20-4383-11ef-8e40-0242ac1c000c.png.png',
    '8239aeca-5566-46cb-88d0-a993f17f0ec0_removed-Music-0c3d3e1a-4384-11ef-8e40-0242ac1c000c.png.png',
    'eb313f84-c135-4d87-9d43-804120a91814_removed-Movie-1e121f34-4384-11ef-8e40-0242ac1c000c.png.png',
    '51555ebe-14e4-4309-a2d2-8611be948164_removed-Sports-2fba7b50-4384-11ef-8e40-0242ac1c000c.png.png',
    '1df37381-9a68-4619-a7b1-9920a5e051f7_removed-Travel-3f277b38-4384-11ef-8e40-0242ac1c000c.png.png',
    'c42c9c37-7ff1-4825-b5fd-8eb2dcb97325_removed-Camera-50a40412-4384-11ef-8e40-0242ac1c000c.png.png',
    'dfc50a8a-52da-4b56-891d-72e096300170_removed-Smile-627d38fc-4384-11ef-8e40-0242ac1c000c.png.png',
    '8771587d-5d14-4606-bdb1-0c9778ee0041_removed-Happiness-70f1c862-4384-11ef-8e40-0242ac1c000c.png.png',
    '97e89c45-2e19-4e78-a585-19a3f1521e73_removed-Friendship-8316ab0c-4384-11ef-8e40-0242ac1c000c.png.png',
    '38286104-974c-4232-9d4a-e9675432e700_removed-Love-9539f15e-4384-11ef-8e40-0242ac1c000c.png.png',
    '63fcad68-1365-44b9-997b-208c54e3a17d_removed-Fashion-a7ba1cc8-4384-11ef-8e40-0242ac1c000c.png.png',
    'ed6e214d-1855-4d1d-92b6-605cbaad7779_removed-Art-be4055ca-4384-11ef-8e40-0242ac1c000c.png.png',
    '9d192cd2-ecf2-4f25-a5c6-34501f3448b2_removed-Food-cfea25e4-4384-11ef-8e40-0242ac1c000c.png.png',
    '9f3c1643-63f3-4877-9880-177b304f321e_removed-Coffee-df29771c-4384-11ef-8e40-0242ac1c000c.png.png',
    '8c72d354-727b-498c-8da7-7ece3c01cb5f_removed-Tea-ef7e2180-4384-11ef-8e40-0242ac1c000c.png.png',
    'b3ca9cd0-ca2e-4288-86e6-d6ca40c18640_removed-Dessert-001c6254-4385-11ef-8e40-0242ac1c000c.png.png',
    '7b92c58a-c166-4fd5-a794-6548fa07ca1a_removed-Celebration-1060e41e-4385-11ef-8e40-0242ac1c000c.png.png',
    '9d3dfbee-f235-4a07-bdc2-0000fb49b8d3_removed-Party-20d57e0e-4385-11ef-8e40-0242ac1c000c.png.png',
    '098c0912-dbf2-4a83-a767-40164053cbc6_removed-Birthday-3294d842-4385-11ef-8e40-0242ac1c000c.png.png',
    '6d50e649-2838-4ea1-9517-eee02f3d6708_removed-Wedding-43d25008-4385-11ef-8e40-0242ac1c000c.png.png',
    '6091ab30-b373-4baa-848f-4ac6e1107dd6_removed-Shoes-559082f6-4385-11ef-8e40-0242ac1c000c.png.png',
    '37205ba5-1d6d-4e94-bb17-ec4497786c9d_removed-Clothing-65ce1188-4385-11ef-8e40-0242ac1c000c.png.png',
    '3b41ef3c-58e5-43ca-8410-e2a25165f439_removed-Accessories-753f7af8-4385-11ef-8e40-0242ac1c000c.png.png',
    '44c88d46-557e-49ad-9bdd-dc69eb9b0903_removed-Family-87a9ec82-4385-11ef-8e40-0242ac1c000c.png.png',
    'cee991a0-150c-4d07-9263-84b4838dc5e0_removed-Nature-97ef8048-4385-11ef-8e40-0242ac1c000c.png.png',
    '99e26fb7-0037-47b2-8a9d-2c5d209fff51_removed-Animals-a7ee8520-4385-11ef-8e40-0242ac1c000c.png.png',
    '7a3553eb-28f8-44c3-acee-34cd3f64417f_removed-Plants-ba7ff764-4385-11ef-8e40-0242ac1c000c.png.png',
    'efc68808-f7ca-45bb-99d9-75d4f3bb5c17_removed-Cat-1b0a0156-4386-11ef-8e40-0242ac1c000c.png.png',
    'b3fdf9ca-feff-41c9-b1c9-b2202723159a_removed-Dog-2c6ecce2-4386-11ef-8e40-0242ac1c000c.png.png',
    '304d6377-baec-4191-8b36-56bd38999691_removed-Flower-3cf98804-4386-11ef-8e40-0242ac1c000c.png.png',
    'cd15d3ba-9144-4d0a-aa0e-dc7f323d4888_removed-Heart-4ed60c28-4386-11ef-8e40-0242ac1c000c.png.png',
    '6f70a437-4aac-4fa3-a0e7-fd6a80f26392_/content/%E1%84%87%E1%85%A1%E1%84%82%E1%85%A1%E1%84%82%E1%85%A1stableremove.png.png',
    'c5de0d3c-e790-4ef4-b7ac-e3d1b5d612de_removed-%EC%82%AC%EA%B3%BC-e76473b8-5c9e-11ef-aa26-0242ac1c000c.png.png',
  ];

  const stickerUrls = STICKERS.map(sticker => `${process.env.S3_BUCKET_URL}/sticker/${sticker}`);

  return NextResponse.json({ stickerUrls });
};
